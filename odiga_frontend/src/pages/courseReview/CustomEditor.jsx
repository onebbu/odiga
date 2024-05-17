import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { useState, useEffect } from "react";
import MyCustomUploadAdapterPlugin from "../component/Ckeditor/MyUploadAdapter";
import Base64UploaderPlugin from "../component/Ckeditor/Base64Upload";

const CustomEditor = ({ initialValue, onChange }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <div>
      {editorLoaded && (
        <CKEditor
          editor={Editor}
          data={initialValue} // 초기 데이터를 전달합니다.
          config={{
            extraPlugins: [MyCustomUploadAdapterPlugin],
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange(data); // 에디터의 데이터 변경 시 onChange 함수 호출
          }}
        />
      )}
    </div>
  );
};

export default CustomEditor;
