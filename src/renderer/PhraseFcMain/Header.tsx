import React from 'react'

type HeaderType = {
  displayName: string,
  currentIndex: number
  totalCount: number,
}
const Header = (props: HeaderType) => {
  const {displayName, currentIndex, totalCount} = props;
  return(
    <header className="flex p-2 bg-cyan-500 text-white">
      <div className="grow">{displayName}</div>
      <div>{`${currentIndex}/${totalCount}`}</div>
    </header>
  )
}

export default Header;
