.PHONY: all
all: quality-check

.PHONY: quality-check
# On ne fait pas les tests car le coverage les lance
quality-check: .build/lint .build/coverage-check .build/duplicate-check .build/dependency-check
	@echo "Qualité OK (make quality-check)"

.PHONY: lint-fix
lint-fix: .build/lint-fix

.PHONY: lint
lint: .build/lint

.PHONY: test
test: .build/test

.PHONY: coverage-check
coverage-check: .build/coverage-check

.PHONY: dependency-check
dependency-check: .build/dependency-check

TEST_PATH="tests"
TEST_FILES=$(shell test -d $(TEST_PATH) && find $(TEST_PATH) -type f -name "*.js")

SOURCE_PATH="src"
SOURCE_FILES=$(shell test -d $(SOURCE_PATH) && find $(SOURCE_PATH) -type f -name "*.js")

# Chemin du node_modules commun
NODE_MODULES_BIN_PATH=$(ROOT_PATH)/node_modules/.bin/
# Chemin vers les fichiers de configurations
CI_CONFIG_PATH=$(ROOT_PATH)/ci/config/


# Permet de s'assurer que le répertoire build commun existe
$(ROOT_PATH)/.build/build:
	mkdir -p $(ROOT_PATH)/.build/ && touch $@

# Permet de s'assurer que l'installation des dépendances communes est faite
$(ROOT_PATH)/.build/install: $(ROOT_PATH)/.build/build $(ROOT_PATH)/package.json
	cd $(ROOT_PATH)/ && npm install && touch .build/install

# Permet de s'assurer que le répertoire build existe
.build/build: Makefile
	mkdir -p .build && touch $@

LERNA=$(NODE_MODULES_BIN_PATH)lerna
$(LERNA): $(ROOT_PATH)/.build/install

# Supprime les dépendances npm
# '::' permet de concaténer des commandes sur la target .clean
clean:: clean-locks
	rm -rf .build .report node_modules

# Permet de s'assurer que l'installation des dépendances est faite
# '::' permet de concaténer des commandes sur la target .build/install
.build/install:: $(ROOT_PATH)/.build/install .build/build package.json
	npm install
	npm prune
	touch $@

# Permet de s'assurer que l'installation des dépendances est faite pour la production
.build/install-production: .build/build package.json
	npm install --production
	npm prune --production
	touch $@

# Permet de s'assurer que le répertoire report existe
.report/report: Makefile
	mkdir -p .report && touch $@

ESLINT=$(NODE_MODULES_BIN_PATH)eslint
ESLINT_CONFIG=$(CI_CONFIG_PATH)eslint.json
$(ESLINT): $(ROOT_PATH)/.build/install
# Corrige et vérifie la conformité du code
.build/lint-fix: .build/build $(ESLINT) $(TEST_FILES) $(SOURCE_FILES)
	@#On prend uniquement les fichiers js qui sont plus récents
	@#que le dernier lint
	$(eval FILES := $(filter-out .build/build, $(filter-out $(ESLINT), $?)))
	@#On lance le lint que si on a des fichiers
	test "$(FILES)" = "" || ($(ESLINT) --config $(ESLINT_CONFIG) --fix $(FILES) && make .build/lint)
	touch $@
# Vérifie la conformité du code (sans modifier les fichiers)
.build/lint: .build/build $(ESLINT) $(TEST_FILES) $(SOURCE_FILES)
	@#On prend uniquement les fichiers js qui sont plus récents
	@#que le dernier lint
	@$(eval FILES := $(filter-out .build/build, $(filter-out $(ESLINT), $?)))
	@#On lance le lint que si on a des fichiers
	@test "$(FILES)" = "" || ($(ESLINT) --config $(ESLINT_CONFIG) $(FILES)) || (echo "Linter KO (make .build/lint)" && exit 1)
	@touch $@
	@echo "Linter OK (make .build/lint)"

MOCHA_BIN=$(NODE_MODULES_BIN_PATH)mocha
MOCHA_CONFIG=$(CI_CONFIG_PATH)mocha.json
MOCHA_CMD=$(MOCHA_BIN) --config $(MOCHA_CONFIG) $(TEST_PATH)
MOCHA_DEPENDENCIES=.build/install $(MOCHA_BIN) $(MOCHA_CONFIG) $(TEST_FILES) $(SOURCE_FILES)
$(MOCHA_BIN): $(ROOT_PATH)/.build/install
# Lance les tests unitaires
.build/test: $(MOCHA_DEPENDENCIES)
	$(MOCHA_CMD)
	touch $@

JSCPD=$(NODE_MODULES_BIN_PATH)jscpd
JSCPD_CONFIG=$(CI_CONFIG_PATH)jscpd.json
$(JSCPD): $(ROOT_PATH)/.build/install
.build/duplicate-check: $(JSCPD) $(JSCPD_CONFIG) $(SOURCE_FILES)
	@$(JSCPD) --config $(JSCPD_CONFIG) || (echo "Duplicate KO (make .build/duplicate-check)" && exit 1)
	@touch $@
	@echo "Duplicate OK (make .build/duplicate-check)"

ISTANBUL_BIN=$(NODE_MODULES_BIN_PATH)nyc
ISTANBUL_CONFIG=$(CI_CONFIG_PATH)nyc.json
ISTANBUL_DEPENDENCIES=$(ISTANBUL_BIN) $(ISTANBUL_CONFIG) $(MOCHA_DEPENDENCIES)
$(ISTANBUL): $(ROOT_PATH)/.build/install
# Vérification de la couverture des tests
.build/coverage-check: $(ISTANBUL_DEPENDENCIES)
	@$(ISTANBUL_BIN) --config $(ISTANBUL_CONFIG) $(MOCHA_CMD) || (echo "Coverage KO (make .build/coverage-check)" && exit 1)
	@touch $@
	@# Si le check de coverage s'est bien passé on valide les tests unitaires par la même occasion
	@touch .build/test
	@echo "Coverage OK (make .build/coverage-check)"
# Génération du rapport html de coverage
.PHONY: coverage-report-html
coverage-report-html: .report/coverage/index.html
	open $<
.report/coverage/index.html: .report/report $(ISTANBUL_DEPENDENCIES)
	$(ISTANBUL_BIN) --config $(ISTANBUL_CONFIG) --report-dir .report/coverage --reporter html $(MOCHA_CMD)

# Vérification que les dépendances sont bien disponible
DEPENDENCY_CHECK_BIN=$(NODE_MODULES_BIN_PATH)dependency-check
$(DEPENDENCY_CHECK_BIN): $(ROOT_PATH)/.build/install

# On vérifie si les paquets utilisées dans les fichiers sources sont bien déclarée dans le package.json
.build/dependency-check: .build/build $(DEPENDENCY_CHECK_BIN) ./package.json $(SOURCE_FILES)
	@$(DEPENDENCY_CHECK_BIN) --missing --unused --no-dev ./package.json $(SOURCE_FILES) || (echo "Dependency check KO (make .build/dependency-check)" && exit 1)
	@touch $@
	@echo "Dependency check OK (make .build/dependency-check)"

# Permet d'effacer les fichiers de locks qui peuvent géner lors de l'installation
.PHONY: clean-locks
clean-locks:
	find . -type f -name "package-lock.json" -exec rm {} \;
	find . -type f -name "npm-shrinkwrap.json" -exec rm {} \;