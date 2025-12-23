#!/bin/bash

# Verification script for SvelteKit Boilerplate Generator

echo "🧪 Running verification tests for Create SvelteKit Boilerplate"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run test
run_test() {
  local test_name=$1
  local test_command=$2
  
  echo "Testing: $test_name"
  if eval "$test_command" > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} $test_name passed"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} $test_name failed"
    ((TESTS_FAILED++))
  fi
  echo ""
}

# Change to project directory
cd "$(dirname "$0")"

echo "📦 Building the CLI..."
npm run build
echo ""

# Test 1: CLI builds successfully
run_test "CLI builds" "test -f dist/index.js"

# Test 2: All template files exist
run_test "Package JSON template exists" "test -f dist/templates/packageJson.js"
run_test "Svelte config template exists" "test -f dist/templates/svelteConfig.js"
run_test "Vite config template exists" "test -f dist/templates/viteConfig.js"
run_test "TSConfig template exists" "test -f dist/templates/tsconfig.js"
run_test "ESLint config template exists" "test -f dist/templates/eslintConfig.js"
run_test "Playwright config template exists" "test -f dist/templates/playwrightConfig.js"
run_test "App HTML template exists" "test -f dist/templates/appHtml.js"
run_test "Layout Svelte template exists" "test -f dist/templates/layoutSvelte.js"
run_test "Page Svelte template exists" "test -f dist/templates/pageSvelte.js"
run_test "Env example template exists" "test -f dist/templates/envExample.js"
run_test "README template exists" "test -f dist/templates/readme.js"

# Test 3: Type definitions exist
run_test "Type definitions exist" "test -f dist/types.d.ts"
run_test "Generator types exist" "test -f dist/generator.d.ts"

# Test 4: Documentation exists
run_test "README exists" "test -f README.md"
run_test "CONTRIBUTING exists" "test -f CONTRIBUTING.md"
run_test "CHANGELOG exists" "test -f CHANGELOG.md"
run_test "Examples directory exists" "test -d examples"
run_test "Full-featured example exists" "test -f examples/full-featured.md"
run_test "Minimal example exists" "test -f examples/minimal.md"
run_test "SaaS example exists" "test -f examples/saas-starter.md"
run_test "Content site example exists" "test -f examples/content-site.md"

# Test 5: Verify the generated projects from previous tests
echo "🏗️  Checking previously generated test projects..."

# Check full configuration
if [ -d /tmp/test-cli/test-sveltekit-app ]; then
  echo -e "${GREEN}✓${NC} Full configuration project exists"
  ((TESTS_PASSED++))
  
  # Check generated files
  if [ -f /tmp/test-cli/test-sveltekit-app/package.json ]; then
    echo -e "${GREEN}✓${NC} package.json generated"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} package.json not found"
    ((TESTS_FAILED++))
  fi
  
  if [ -f /tmp/test-cli/test-sveltekit-app/svelte.config.js ]; then
    echo -e "${GREEN}✓${NC} svelte.config.js generated"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} svelte.config.js not found"
    ((TESTS_FAILED++))
  fi
  
  if [ -d /tmp/test-cli/test-sveltekit-app/src/routes ]; then
    echo -e "${GREEN}✓${NC} Routes directory generated"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} Routes directory not found"
    ((TESTS_FAILED++))
  fi
  
  if [ -f /tmp/test-cli/test-sveltekit-app/src/lib/trpc/router.ts ]; then
    echo -e "${GREEN}✓${NC} tRPC files generated"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} tRPC files not found"
    ((TESTS_FAILED++))
  fi
  
  if [ -f /tmp/test-cli/test-sveltekit-app/src/routes/blog/+page.svelte ]; then
    echo -e "${GREEN}✓${NC} Blog files generated"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} Blog files not found"
    ((TESTS_FAILED++))
  fi
  
  if [ -f /tmp/test-cli/test-sveltekit-app/src/routes/sitemap.xml/+server.ts ]; then
    echo -e "${GREEN}✓${NC} SEO files generated"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} SEO files not found"
    ((TESTS_FAILED++))
  fi
else
  echo -e "${RED}✗${NC} Full configuration project not found (run test.ts first)"
  ((TESTS_FAILED++))
fi

echo ""

# Check minimal configuration
if [ -d /tmp/test-cli/minimal-sveltekit-app ]; then
  echo -e "${GREEN}✓${NC} Minimal configuration project exists"
  ((TESTS_PASSED++))
  
  if [ -f /tmp/test-cli/minimal-sveltekit-app/package.json ]; then
    echo -e "${GREEN}✓${NC} Minimal package.json generated"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} Minimal package.json not found"
    ((TESTS_FAILED++))
  fi
  
  # Verify no optional features were added
  if [ ! -d /tmp/test-cli/minimal-sveltekit-app/src/lib/trpc ]; then
    echo -e "${GREEN}✓${NC} No tRPC in minimal build (correct)"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗${NC} Unwanted features in minimal build"
    ((TESTS_FAILED++))
  fi
else
  echo -e "${RED}✗${NC} Minimal configuration project not found (run test-minimal.ts first)"
  ((TESTS_FAILED++))
fi

echo ""
echo "================================"
echo "Test Results:"
echo "--------------------------------"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo "================================"

if [ $TESTS_FAILED -eq 0 ]; then
  echo ""
  echo -e "${GREEN}🎉 All tests passed!${NC}"
  exit 0
else
  echo ""
  echo -e "${RED}❌ Some tests failed${NC}"
  exit 1
fi
