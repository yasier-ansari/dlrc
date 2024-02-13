import { AuthContext } from "@/context/AuthContext"
import { cn } from '@/lib/utils'
import { useContext } from "react"
import PageLoading from "./PageLoading"

const MaxWidthWrapper = ({ className, children }) => {
	const { mainLoading } = useContext(AuthContext)
	return (
		<section
			className={cn(
				'mx-auto w-full h-max px-2.5 md:px-20 ',
				className
			)}
		>
			{children}
			{/* {
				!mainLoading ? (
					children
				) : (
					<PageLoading />
				)
			} */}
		</section>
	)
}

export default MaxWidthWrapper
