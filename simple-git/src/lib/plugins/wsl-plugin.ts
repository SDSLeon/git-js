import type { SimpleGitPluginConfig } from '../types';
import type { PluginStore } from './plugin-store';

/**
 * Routes all git commands through `wsl.exe` so that simple-git can operate
 * on repositories that live inside a WSL distribution.
 *
 * The plugin overrides the spawn binary to `wsl.exe` and prepends the
 * distribution, working-directory and `-- git` arguments before the
 * regular git arguments produced by simple-git.
 */
export function wslPlugin(
   plugins: PluginStore,
   wsl: SimpleGitPluginConfig['wsl']
): void {
   const prefix = ['-d', wsl.distro, '--cd', wsl.path, '--', 'git'];

   plugins.append('spawn.binary', () => 'wsl.exe');

   plugins.append('spawn.args', (data) => {
      return [...prefix, ...data];
   });
}
