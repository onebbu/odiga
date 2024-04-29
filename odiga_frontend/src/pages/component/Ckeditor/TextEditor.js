// <path-to-your-build>/src/ckeditor.ts or file containing editor configuration if you are integrating an editor from source.

// The editor creator to use.
import  Editor  from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import MyCustomUploadAdapterPlugin from './MyUploadAdapter';
import Base64UploaderPlugin from './Base64Upload';


const TextEditor = ({setData}) => {
    const edrtorConfiguration = {
		toolbar: {
			items: [
				'heading',
				'|',
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'|',
				'outdent',
				'indent',
				'-',
				'undo',
				'redo',
				'imageUpload',
				'blockQuote'
			],
			shouldNotGroupWhenFull: true
		},
		language: 'ko',
		extraPlugins : [MyCustomUploadAdapterPlugin],
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			]
		}
	};

    return (
        <CKEditor 
        editor={Editor}
        config={edrtorConfiguration}
        data = "<p> 이곳에 내용을 작성해 주세요!</p>"
        onChange={(event, editor) => {
            setData(editor.getData()); // 에디터 작성 내용 저장 
        }}
        />
    )
}

export default TextEditor;