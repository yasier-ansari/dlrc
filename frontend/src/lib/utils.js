import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
	return twMerge(clsx(inputs))
}

export const faqs = [
	{
		question: 'What is DLRC , and how will it help me?',
		answer:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias cumque dolore officiis quo impedit, ratione quos at dolorum illo voluptatibus sint natus consequuntur totam veritatis dolores, laborum nemo beatae?',
		isAccordionOpen: false
	},
	{
		question: 'Is the Laptop free?',
		answer:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias cumque dolore officiis quo impedit, ratione quos at dolorum illo voluptatibus sint natus consequuntur totam veritatis dolores, laborum nemo beatae?',
		isAccordionOpen: false
	},
	{
		question: 'Can I use Laptop for non educational purpose?',
		answer:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias cumque dolore officiis quo impedit, ratione quos at dolorum illo voluptatibus sint natus consequuntur totam veritatis dolores, laborum nemo beatae?',
		isAccordionOpen: false
	},
	{
		question: 'How can I get help regarding the process?',
		answer:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias cumque dolore officiis quo impedit, ratione quos at dolorum illo voluptatibus sint natus consequuntur totam veritatis dolores, laborum nemo beatae?',
		isAccordionOpen: false
	}
]

export const rulesArray = [
	{
		title: 'Issuance ',
		ruleArray: [
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?',
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?',
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?',
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?'
		]
	},
	{
		title: 'Return ',
		ruleArray: [
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?',
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?',
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?',
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?'
		]
	},
	{
		title: 'Website ',
		ruleArray: [
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?',
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?',
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?',
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, autem?'
		]
	}
]
