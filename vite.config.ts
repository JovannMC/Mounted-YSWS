import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type PluginOption } from 'vite';
import { execSync } from 'child_process';

// stole my own commit hash code from VERT-sh/VERT lmao

// coollify removes the .git folder but exposes commit via SOURCE_COMMIT env variable
let commitHash = process.env.SOURCE_COMMIT
	? process.env.SOURCE_COMMIT.substring(0, 7) // shorten it lol
	: 'unknown';

if (commitHash === 'unknown') {
	try {
		commitHash = execSync('git rev-parse --short HEAD').toString().trim();
	} catch (e) {
		console.warn(`Could not determine Git commit hash: ${e}`);
		commitHash = 'unknown';
	}
}

export default defineConfig(() => {
	const plugins: PluginOption[] = [tailwindcss(), sveltekit()];

	return {
		plugins,
		define: {
			__COMMIT_HASH__: JSON.stringify(commitHash)
		}
	};
});
