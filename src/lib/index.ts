// all this data would actually be a database query in the real app, but this is just for visualization for the gap year application

export interface User {
	username: string;
	profile_image: string;
}

export interface Comment {
	username: string;
	content: string;
	timestamp: string;
}

export interface Project {
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
	status: 'in progress' | 'completed';
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

const getRandomTimestamp = (start: Date, end: Date): string => {
	const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
	return new Date(randomTime).toISOString();
};

const randomStart = new Date('2026-04-01T00:00:00Z');
const randomEnd = new Date();

export const comments: Comment[] = [
	{
		username: 'Maya',
		content: 'This is a comment from Maya.',
		timestamp: getRandomTimestamp(randomStart, randomEnd)
	},
	{
		username: 'Heidi',
		content: 'This is a comment from Heidi.',
		timestamp: getRandomTimestamp(randomStart, randomEnd)
	},
	{
		username: 'Orpheus',
		content: 'This is a comment from Orpheus.',
		timestamp: getRandomTimestamp(randomStart, randomEnd)
	},
	{
		username: 'Maya',
		content: 'This is another comment from Maya.',
		timestamp: getRandomTimestamp(randomStart, randomEnd)
	},
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
		views: 4312,
		status: 'completed',
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
		views: 63,
		status: 'in progress',
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
		views: 931,
		status: 'in progress',
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
		views: 512,
		status: 'completed',
		comments: [comments[0], comments[3]]
	},
	{
		author: users[1],
		name: 'Project 5',
		id: 5,
		description: 'This is a description of project 5.',
		image: 'https://placehold.co/150',
		repo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		demo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		hours: 50,
		views: 347,
		status: 'completed',
		comments: [comments[1]]
	},
	{
		author: users[2],
		name: 'Project 6',
		id: 6,
		description: 'This is a description of project 6.',
		image: 'https://placehold.co/150',
		repo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		demo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		hours: 60,
		views: 341,
		status: 'in progress',
		comments: [comments[2]]
	},
	{
		author: users[1],
		name: 'Project 7',
		id: 7,
		description: 'This is a description of project 7.',
		image: 'https://placehold.co/150',
		repo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		demo_url: 'https://github.com/JovannMC/Mounted-YSWS',
		hours: 70,
		views: 404,
		status: 'completed',
		comments: [comments[1]]
	}
];

export interface ShopItem {
	name: string;
	price: string;
	image: string;
	blurb?: string;
	category: 'stickers' | 'cards' | 'hardware' | 'software' | 'games';
}

export const items: ShopItem[] = [
	// stickers
	{
		name: 'VR-related Stickers',
		price: '20',
		image: '/static/shop/slimevr_stickers_v1.webp',
		blurb: 'ooh, vr stickers!',
		category: 'stickers'
	},
	{
		name: 'SlimeVR Stickers (v1)',
		price: '20',
		image: '/static/shop/slimevr_stickers_v1.webp',
		blurb: 'ooh, cute slime stickers!',
		category: 'stickers'
	},
	{
		name: 'SlimeVR Stickers (v2)',
		price: '20',
		image: '/static/shop/slimevr_stickers_v2.webp',
		blurb: 'ooh, cute slime stickers, but with me (those headphones)!',
		category: 'stickers'
	},
	{
		name: 'SlimeVR Stickers (v3)',
		price: '20',
		image: '/static/shop/slimevr_stickers_v3_sketch.webp',
		blurb: 'ooh, cute slime stickers, but with me more pretty!',
		category: 'stickers'
	},

	// cards
	{
		name: '$25 Meta Store Gift Card',
		price: '469',
		image: '/static/shop/meta_gc.webp',
		blurb: 'buy stuff from the Meta store, you standalone user you',
		category: 'cards'
	},
	{
		name: '$25 Steam Gift Card',
		price: '469',
		image: '/static/shop/steam_gc.webp',
		blurb: 'fuel your Steam library.. hopefully with VR stuff',
		category: 'cards'
	},
	{
		name: '$15 VR Asset Grant',
		price: '265',
		image: '/static/shop/hcb_card.webp',
		blurb: 'style up your vr avatar or game!',
		category: 'cards'
	},
	{
		name: '$30 VR Asset Grant',
		price: '529',
		image: '/static/shop/hcb_card.webp',
		blurb: 'style up your vr avatar or game, but more!',
		category: 'cards'
	},
	{
		name: '$50 VR Asset Grant',
		price: '882',
		image: '/static/shop/hcb_card.webp',
		blurb: 'style up your vr avatar or game, but even more!',
		category: 'cards'
	},

	// hardware
	{
		name: '6x SlimeVR Trackers',
		price: '1999',
		image: '/static/shop/slimevr_trackers.webp',
		blurb: 'time to go dancing!',
		category: 'hardware'
	},
	{
		name: '10x SlimeVR Trackers',
		price: '2999',
		image: '/static/shop/slimevr_trackers.webp',
		blurb: 'time to go dancing.. or motion capturing with this one!',
		category: 'hardware'
	},
	{
		name: 'Quest 2 (used)',
		price: '2499',
		image: '/static/shop/quest_2.webp',
		blurb: 'the grandparent of the quest 3',
		category: 'hardware'
	},
	{
		name: 'Quest 3s (used)',
		price: '3679',
		image: '/static/shop/quest_3s.webp',
		blurb: 'the little sister of the quest 3',
		category: 'hardware'
	},
	{
		name: 'Quest 3 (used)',
		price: '4299',
		image: '/static/shop/quest_3.webp',
		blurb: 'the favourite child, probably',
		category: 'hardware'
	},
	{
		name: 'Valve Index',
		price: '3679',
		image: '/static/shop/valve_index.webp',
		blurb: 'the previously premium valve headset',
		category: 'hardware'
	},
	{
		name: 'Steam Frame',
		price: '6700',
		image: '/static/shop/steam_frame.webp',
		blurb: 'the new premium valve headset',
		category: 'hardware'
	},

	// software
	{
		name: 'Virtual Desktop',
		price: '350',
		image: '/static/shop/virtual_desktop.webp',
		blurb: 'honestly, never used this one for wireless pc vr streaming',
		category: 'software'
	},
	{
		name: 'VRChat+ (1 month)',
		price: '120',
		image: '/static/shop/vrc_plus.webp',
		blurb: 'alright, go back to cuddling your friends',
		category: 'software'
	},
	{
		name: 'VRChat+ (1 year)',
		price: '1200',
		image: '/static/shop/vrc_plus.webp',
		blurb: 'alright, go back to cuddling your friends for longer',
		category: 'software'
	},

	// games
	{
		name: 'Example Indie Game',
		price: '175',
		image: '/static/shop/steam_indie.webp',
		blurb: 'support those vr indie devs!',
		category: 'games'
	},
	{
		name: 'Phasmophobia',
		price: '250',
		image: '/static/shop/steam_indie.webp',
		blurb: 'fall on the floor in fear with your friends',
		category: 'games'
	},
	{
		name: 'Beat Saber',
		price: '300',
		image: '/static/shop/steam_indie.webp',
		blurb: 'make this your workout, end up detaching your arms',
		category: 'games'
	},
	{
		name: 'Walkabout Mini Golf',
		price: '300',
		image: '/static/shop/steam_indie.webp',
		blurb: 'chill multiplayer mini golf',
		category: 'games'
	},
	{
		name: 'Job Simulator',
		price: '300',
		image: '/static/shop/steam_indie.webp',
		blurb: 'chaotic office VR fun',
		category: 'games'
	},
	{
		name: 'Blade & Sorcery',
		price: '400',
		image: '/static/shop/steam_indie.webp',
		blurb: 'sandbox melee combat in VR',
		category: 'games'
	},
	{
		name: 'Boneworks',
		price: '450',
		image: '/static/shop/steam_indie.webp',
		blurb: 'physics-heavy VR action',
		category: 'games'
	},
	{
		name: 'Half-Life: Alyx',
		price: '600',
		image: '/static/shop/steam_indie.webp',
		blurb: 'come on, its half life in vr, you know you want it',
		category: 'games'
	}
];

export const getRandomizedItems = (count: number): ShopItem[] => {
	const shuffled = [...items];

	for (let i = shuffled.length - 1; i > 0; i -= 1) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}

	return shuffled.slice(0, count).map((item) => ({ ...item }));
};
