import picocolors from 'picocolors';

export function intro() {
  console.log('\n' + picocolors.bold(picocolors.cyan('🚀 Create SvelteKit Boilerplate')) + '\n');
  console.log(picocolors.dim('  Create a Svelte 5 / SvelteKit app with your preferred features\n'));
}

export function outro(projectName: string) {
  console.log('\n' + picocolors.green('✓') + ' Project created successfully!\n');
  console.log(picocolors.bold('Next steps:'));
  console.log(picocolors.dim(`  1. cd ${projectName}`));
  console.log(picocolors.dim('  2. npm install'));
  console.log(picocolors.dim('  3. npm run dev'));
  console.log('\n' + picocolors.dim('Happy coding! 🎉\n'));
}

export function cancel() {
  console.log('\n' + picocolors.red('✖') + ' Operation cancelled\n');
}
