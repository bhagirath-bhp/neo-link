import { AwesomeButton } from "react-awesome-button";
import 'react-awesome-button/dist/styles.css';
import "./styles.css"

const LinkItem = (props: {
  title: string;
  url: string;
  type: string;
  imageURL?: string;
}) => {
  return (
    <AwesomeButton>
      {props.title}
    </AwesomeButton>
    // <div className="list_item hover-style-1">
    //   <a href={props.url || "#"} className="list-item_link">
    //     <div className="list-item_bg"></div>

    //     <div className="list-item_title">{props.title || "Instagram"}</div>
    //   </a>
    // </div>
  )
}

export default LinkItem


