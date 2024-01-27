import React, { useContext, useState } from 'react'
import debounce from 'lodash.debounce'
import { HiOutlineSearch } from 'react-icons/hi'
import Fuse from 'fuse.js'
import { IoMdRefresh } from 'react-icons/io'

const SearchInput = (props) => {
	const fuseOptions = {
		isCaseSensitive: false,
		includeScore: false,
		shouldSort: true,
		includeMatches: false,
		findAllMatches: false,
		minMatchCharLength: 1,
		location: 0,
		threshold: 0.4,
		distance: 100,
		useExtendedSearch: false,
		ignoreLocation: false,
		ignoreFieldNorm: false,
		fieldNormWeight: 1,
		keys: [
			'student_id.fullname',
			'student_id.prn',
			'student_id.domain_id',
			'student_id.department',
			'student_id.year',
			'student_id.sem'
		]
	}
	const [searchText, setSearchText] = useState('')
	const fuseSearch = (text) => {
		const fuse = new Fuse(props.userList, fuseOptions)
		const result = fuse.search(text)
		const ret = result?.map((el) => el?.item)
		return ret
	}
	const debouncedSearch = debounce((searchText) => {
		// Call your search function here
		const searchResult = fuseSearch(searchText)
		setNewList(searchResult)
		// Update your component state or perform any other action with the search result
		console.log(searchResult)
	}, 2000) // Debounce for 3 seconds (adjust as needed)

	// Call this function whenever the search input changes
	const handleSearchChange = (event) => {
		event.preventDefault()
		const searchText = event.target.value
		setSearchText(event.target.value)
		debouncedSearch(searchText)
	}

	// let searchHandler = (e) => {
	// 	e.preventDefault()
	// 	let res = e.target.value
	// 	setSearchText(res)
	// 	props.searchRefresh(res)
	// }
	// const submitHandler = (e) => {
	// 	e.preventDefault()
	// 	props.searchRefresh(searchText)
	// 	console.error('ad')
	// }
	return (
		<>
			<form className='relative w-full py-2  lg:py-1 justify-center flex items-center rounded-md bg-stone-200 text-sm '>
				<button
				// onClick={submitHandler}
				>
					<HiOutlineSearch className='absolute w-4 h-4 md:w-6 md:h-6 top-[26%] left-3 md:left-4 md:top-[26%] lg:top-[20%] ' />
				</button>
				<input
					onChange={handleSearchChange}
					value={searchText}
					type='text'
					placeholder='Search...'
					className='  block w-full pl-10  outline-none md:pl-12  lg:pl-12 sm:py-1 md:py-2 h-full rounded-md bg-stone-200  '
				/>
			</form>
		</>
	)
}

const Search = ({
	userList,
	setNewList,
	laptopList,
	laptopIdList
}) => {
	const fuseOptions = {
		isCaseSensitive: false,
		includeScore: false,
		shouldSort: true,
		includeMatches: false,
		findAllMatches: true,
		minMatchCharLength: 1,
		location: 0,
		threshold: 0.3,
		distance: 100,
		useExtendedSearch: false,
		ignoreLocation: false,
		ignoreFieldNorm: false,
		fieldNormWeight: 1,
		keys: laptopIdList
			? ['condition', 'department', 'laptop_id']
			: laptopList
			? [
					'studentInfo.fullname',
					'studentInfo.prn',
					'studentInfo.domain_id',
					'studentInfo.year'
			  ]
			: [
					'student_id.fullname',
					'student_id.prn',
					'student_id.domain_id',
					'student_id.year'
			  ]
	}
	const [searchText, setSearchText] = useState('')
	const [semFilter, setSemFilter] = useState('')
	const [deptFilter, setDeptFilter] = useState('')
	const fuseSearch = (text, sem, dept) => {
		const fuse = new Fuse(userList, fuseOptions)
		const result = fuse.search(text || ' ')
		console.log(result)
		var ret = result?.map((el) => el?.item)

		if (!laptopList && !laptopIdList) {
			if (sem) {
				ret = ret.filter((item) => item.student_id.sem === sem)
			}

			if (dept) {
				ret = ret.filter(
					(item) => item.student_id.department === dept
				)
			}
		} else if (laptopList) {
			if (sem) {
				ret = ret.filter((item) => item.studentInfo.sem === sem)
			}

			if (dept) {
				ret = ret.filter(
					(item) => item.studentInfo.department === dept
				)
			}
		}
		console.log(ret)
		return ret
	}
	const debouncedSearch = debounce((text, sem, dept) => {
		// Call your search function here
		const searchResult = fuseSearch(text, sem, dept)
		setNewList(searchResult)
	}, 1000)

	// Call this function whenever the search input changes
	const handleSearchChange = (event, text, sem, dept) => {
		console.log(text, sem, dept)
		event.preventDefault()
		if (text?.trim() === ' ' || text?.trim() === '') {
			setNewList(userList)
		}
		debouncedSearch(text, sem, dept)
	}
	const dept_options = [
		'CSE (AI - ML)',
		'CSE (AI - DS)',
		'COMPS',
		'IT',
		'Electrical',
		'Mechanical',
		'Civil',
		'AutoMobile'
	]
	const sem_options = [
		'I',
		'II',
		'III',
		'IV',
		'V',
		'VI',
		'VII',
		'VIII'
	]
	const refreshHandler = () => {
		setSearchText('')
		setDeptFilter('')
		setSemFilter('')
		setNewList(userList)
		console.log('working')
	}

	return (
		<div
			className={`flex flex-col w-[95%] md:w-[90%] mx-auto lg:flex-row p-1 sm:p-2 md:p-3 lg:p-4  items-center ${
				laptopIdList
					? 'max-w-5xl justify-between'
					: 'max-w-3xl justify-center'
			}  space-y-4 md:space-y-6 lg:space-x-6 w-full lg:space-y-0 relative`}
		>
			<form
				className={` ${
					!laptopIdList
						? 'md:basis-[55%]'
						: ' sm:w-[70%] md:w-[60%] max-w-xl mx-auto'
				} relative w-full py-2 lg:py-1 justify-center flex items-center rounded-md bg-stone-200 text-sm `}
			>
				<button
				// onClick={submitHandler}
				>
					<HiOutlineSearch className='absolute w-4 h-4 md:w-6 md:h-6 top-[26%] left-3 md:left-4 md:top-[26%] lg:top-[20%] ' />
				</button>
				<input
					onChange={(e) => {
						setSearchText(e.target.value)
						handleSearchChange(
							e,
							e.target.value,
							semFilter,
							deptFilter
						)
					}}
					value={searchText}
					type='text'
					placeholder='Search...'
					className='  block w-full pl-10 outline-none md:pl-12  lg:pl-12 sm:py-1 md:py-2 h-full rounded-md bg-stone-200  '
				/>
			</form>
			{!laptopIdList && (
				<div className=' w-full lg:basis-[75%] flex text-xs md:text-base lg:w-max mt-3 sm:mt-5 lg:mt-0 justify-start items-center flex-col md:flex-row space-y-4 md:space-y-0 md:justify-end md:space-x-6 '>
					<div className='basis-1/2 w-full py-1 md:py-2 lg:py-[10px]  flex items-center justify-center space-x-5  md:space-x-8 lg:space-x-3 text-sm  '>
						<select
							onChange={(e) => {
								setDeptFilter(e.target.value)
								handleSearchChange(
									e,
									searchText,
									semFilter,
									e.target.value
								)
							}}
							value={deptFilter}
							className=' text-black bg-stone-200 rounded-md h-full w-full px-1 md:px-2 lg:px-3 py-2 md:py-3 lg:py-[10px] outline-none '
						>
							<option value='' disabled hidden>
								Select Department
							</option>
							{dept_options.map((cur, key) => {
								return (
									<option value={cur} key={key}>
										{cur}
									</option>
								)
							})}
						</select>
					</div>
					<div className='basis-1/2 w-full py-1 md:py-2 lg:py-[10px]  flex items-center justify-center space-x-5 md:space-x-8 lg:space-x-3 text-sm'>
						<select
							onChange={(e) => {
								setSemFilter(e.target.value)
								handleSearchChange(
									e,
									searchText,
									e.target.value,
									deptFilter
								)
							}}
							value={semFilter}
							className=' bg-stone-200  text-black rounded-md h-full w-full px-1 md:px-2 lg:px-3 py-2 md:py-3 lg:py-[10px] outline-none '
						>
							<option value='' disabled hidden>
								Select Sem
							</option>
							{sem_options.map((cur, key) => {
								return (
									<option value={cur} key={key}>
										{cur}
									</option>
								)
							})}
						</select>
						<button
							onClick={refreshHandler}
							className='flex items-center justify-center'
						>
							<IoMdRefresh className=' hover:fill-green-700 fill-green-600  w-4 h-4 sm:w-5 sm:h-5 md:h-6 md:w-6 lg:h-7 lg:w-7 ' />
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Search
