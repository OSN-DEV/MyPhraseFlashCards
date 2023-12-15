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
      // <div className={styleList.join(' ').trim()}>
      <div>
      {renderTextWithBr(children, styleList.join(' ').trim())}
      </div>
    )
  };
}

const renderTextWithBr = (text: string, styles: string) => {
  const lines = text.split('\n');
  return lines.map((line, index) => (

    <p className={styles.indexOf("py") < 0 ? "py-2 " + styles : styles} key={index}>
      {addBr(line)}
    </p>
  ))
};

const addBr = (text:string): JSX.Element => {
  const lines = text.split('@n@');
  const result = lines.map((line, index) => {
    return(
      <>
      {line}
      {index < lines.length-1 && <br/>}
      </>
    )
  });
console.log(result);
  return (<>{result}</>);
}
export default Para;
