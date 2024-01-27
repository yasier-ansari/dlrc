import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

const MaxWidthWrapper = ({ className, children }) => {
	return (
		<section
			className={cn(
				'mx-auto w-full h-max px-2.5 md:px-20 ',
				className
			)}
		>
			{children}
		</section>
	)
}

export default MaxWidthWrapper
