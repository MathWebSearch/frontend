import * as React from 'react';
import styles from './DropDownButton.module.css';

/*
 * A DropDown Button that shows on click the contens
 *
 * */
interface IDropDownEntry {
  // text is shown in the entry
  text: string;
  // argument for the clickHandler
  clickarg: string;
  // argument for the hover handler
  hoverarg?: string;
}
interface IDropDownButtonProps<T> {
  /* text of the button*/
  name: string;
  /* what happens when you click on an element*/
  clickHandler: (element: string, event: React.SyntheticEvent) => void;

  /* what happens when you hover over  an element*/
  hoverHandler?: (element: string) => void;
  /* list of the contents that should be presented*/
  list: Array<T>;
  /* function that converts the elements of an list to text, clickarg and hoverarg*/
  reducer: (a: T) => IDropDownEntry;
}
export default function DropDownButton<T>(
  props: IDropDownButtonProps<T>,
): JSX.Element {
  const {name, clickHandler, hoverHandler, list, reducer} = props;
  const [expanded, setExpansion] = React.useState(false);
  const toggle = () => setExpansion(!expanded);
  const close = () => setExpansion(false);
  const clickandclose = (element: string, event: React.SyntheticEvent) => {
    clickHandler(element, event);
    close();
  };

  return (
    <div className={expanded ? styles.DropDownactive : styles.DropDown}>
      <button className={styles.DropDownbtn} onClick={toggle}>
        {name}
      </button>
      <div className={styles.DropDownContent} onMouseLeave={close}>
        {list.map((entry: T, index: number) => {
          const {text, clickarg, hoverarg} = reducer(entry);
          return (
            <div
              key={index}
              onClick={(event: React.SyntheticEvent) =>
                clickandclose(clickarg, event)
              }
              onMouseOver={
                hoverHandler && hoverarg
                  ? () => hoverHandler(hoverarg)
                  : undefined
              }>
              {text}
            </div>
          );
        })}
      </div>
    </div>
  );
}
