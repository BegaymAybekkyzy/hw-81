import LinksForm from "./components/LinksForm/LinksForm.tsx";
import {useAppSelector} from "./app/hooks.ts";
import {selectLink} from "./store/linksSlice.ts";


const App = () => {
    const link = useAppSelector(selectLink);

    let content: React.ReactNode;
    if (link) {
        content = (<a href={link.originalUrl}>http://localhost:8000/{link.shortUrl}</a>)
    }

  return (
    <>
      <LinksForm/>
        {content}
    </>
  )
};

export default App
