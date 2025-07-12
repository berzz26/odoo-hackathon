import Navbar from "../components/Navbar";
import TextEditor from "../components/TextEditor";

export default function AskQuestion(){
    const handleEditorSave = (data) => {
    setSavedData(data);
  };
    return(
        <div>
            <Navbar/>
            <TextEditor onSave={handleEditorSave}/>            
        </div>
    )
}