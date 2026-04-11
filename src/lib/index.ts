// all this data would actually be a database query in the real app, but this is just for visualization for the gap year application

interface User {
	username: string;
	profile_image: string;
}

interface Comment {
	username: string;
	content: string;
	timestamp: string;
}

interface Project {
	// details
	author: User;
	id: number;
	name: string;
	description: string;
	image: string;
	repo_url: string;
	demo_url?: string;

	// project stats
	// could have likes in the real app
	hours: number;
	views: number;
	comments?: Comment[];
}

export const users: User[] = [
	{
		username: 'Maya',
		profile_image: 'https://placehold.co/50'
	},
	{
		username: 'Heidi',
		profile_image: 'https://placehold.co/50'
	},
	{
		username: 'Orpheus',
		profile_image: 'https://placehold.co/50'
	}
];

export const comments: Comment[] = [
	{
		username: 'Maya',
		content: 'This is a comment from Maya.',
		timestamp: '2024-06-01T12:00:00Z'
	},
	{
		username: 'Heidi',
		content: 'This is a comment from Heidi.',
		timestamp: '2024-06-01T14:00:00Z'
	},
	{
		username: 'Orpheus',
		content: 'This is a comment from Orpheus.',
		timestamp: '2024-06-01T16:00:00Z'
	},
	{
		username: 'Maya',
		content: 'This is another comment from Maya.',
		timestamp: '2024-06-04T18:00:00Z'
	}
];

export const projects: Project[] = [
	{
		author: users[0],
		name: 'Project 1',
		id: 1,
		description: 'This is a description of project 1.',
		image: 'https://placehold.co/150',
		repo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		demo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		hours: 10,
		views: 100,
		comments: [comments[0], comments[1], comments[2], comments[3]]
	},
	{
		author: users[1],
		name: 'Project 2',
		id: 2,
		description: 'This is a description of project 2.',
		image: 'https://placehold.co/150',
		repo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		demo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		hours: 20,
		views: 200,
		comments: [comments[1]]
	},
	{
		author: users[2],
		name: 'Project 3',
		id: 3,
		description: 'This is a description of project 3.',
		image: 'https://placehold.co/150',
		repo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		demo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		hours: 30,
		views: 200,
		comments: [comments[2]]
	},
	{
		author: users[0],
		name: 'Project 4',
		id: 4,
		description: 'This is a description of project 4.',
		image: 'https://placehold.co/150',
		repo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		demo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		hours: 40,
		views: 300,
		comments: [comments[0], comments[3]]
	}
];

interface ShopItem {
	name: string;
	price: string;
	image: string;
}

export const items: ShopItem[] = [
	{ name: 'VR Stickers', price: '20', image: 'https://placehold.co/150?text=Stickers' },
	{ name: 'VRChat+ (1 month)', price: '120', image: 'https://placehold.co/150?text=VRChat' },
	{ name: '$30 VR Asset Grant', price: '529', image: 'https://placehold.co/150?text=VR+Assets' },
	{ name: '6x SlimeVR Trackers', price: '2599', image: 'https://placehold.co/150?text=SlimeVR' },
	{ name: 'Quest 3s', price: '3679', image: 'https://placehold.co/150?text=Quest+3s' }
];
