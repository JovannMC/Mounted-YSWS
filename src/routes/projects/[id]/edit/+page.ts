import { error } from '@sveltejs/kit';
import { projects } from '$lib';

export function load({ params }) {
	const projectId = Number(params.id);
	const project = projects.find((item) => item.id === projectId);

	if (!project) throw error(404, 'Project not found');

	return { project };
}
