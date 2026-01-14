import { runCli } from 'repomix';
import fs from 'node:fs';

async function testPackImplementation() {
  const cwd = process.cwd();
  const ignorePatterns = [
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/__stories__/**'
      ].join(',');
  const config = {
    style: 'json',
    output: 'repomix-output.json',
    ignore: ignorePatterns,
    compress: true,
    removeComments: true,
    removeEmptyLines: true,
    directoryStructure: true,
    gitignore: true,
    files: false,  // This should exclude source code content
    fileSummary: false,
    defaultPatterns: false
  };
  
  console.log('DEBUG: Using runCli with includeFiles: false');
  console.log('DEBUG: Config:', JSON.stringify(config, null, 2));
  
  try {
    const result = await runCli(['.'], cwd, config);
    
    fs.writeFileSync('debug-pack-result.json', JSON.stringify(result, null, 2));
    console.log('DEBUG: Result written to debug-pack-result.json');
    console.log('DEBUG: Summary:', {
      totalFiles: result?.packResult?.totalFiles,
      totalCharacters: result?.packResult?.totalCharacters,
      totalTokens: result?.packResult?.totalTokens
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

testPackImplementation();
