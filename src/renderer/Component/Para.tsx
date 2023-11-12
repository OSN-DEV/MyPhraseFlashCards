import React from 'react'
import BaseStyleProps from './BaseStyleProps';

interface H1Props extends BaseStyleProps {
}

const Para = (props: H1Props) => {
  const {styles, children} = props;
  const styleList: string[] = [
    "leading-8",
    styles ?? '',
  ]
  if (!children) {
    return <></>
  }
  if (typeof children !== 'string' ) {
    return <p className={styleList.join(' ').trim()}>{children}</p>
  } else {
    return(
      <>
      {renderTextWithBr(children, styleList.join(' ').trim())}
      </>
    )
  };
}

const renderTextWithBr = (text: string, styles: string) => {
    const lines = text.split('\n');
  return lines.map((line, index) => (
    // <React.Fragment key={index}>
    //   {line}
    //   {index < lines.length - 1 && <br />}
    // </React.Fragment>
    <p className={"py-2 " + styles}key={index}>
      {line}
    </p>
  ))
};

export default Para;