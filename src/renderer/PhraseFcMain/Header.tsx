import React from 'react'

type HeaderType = {
  displayName: string,
  currentIndex: number
  totalCount: number,
}
const Header = (props: HeaderType) => {
  const {displayName, currentIndex, totalCount} = props;
  return(
    <>
      <div>{displayName}</div>
      <div>{`${currentIndex}/${totalCount}`}</div>
    </>
  )
}

export default Header;
