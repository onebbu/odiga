class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    //이미지를 업로드하는순간 이미지를 base64url로 불러올려함
    upload() {
        return this.loader.file.then( file => new Promise(((resolve, reject) => {
            this._initRequest();
            this._initListeners( resolve, reject, file );
            this._sendRequest( file );
        })))
    }
    // upload() {
    //     var reader  = new FileReader();
    
    //     return new Promise( ( resolve, reject ) => {
    //         reader.addEventListener( 'load', () => {
    //             resolve( { default: reader.result } );
    //         });
    
    //         reader.addEventListener( 'error', err => {
    //             reject( err );
    //         });
    
    //         reader.addEventListener( 'abort', () => {
    //             reject();
    //         });                    
    
    //         this.loader.file.then( file => {
    //             reader.readAsDataURL( file );
    //         });                        
    //     })
    // }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/upload', true);
        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = '에러.'

        xhr.addEventListener('error', () => {reject(genericErrorText)})
        xhr.addEventListener('abort', () => reject())
        xhr.addEventListener('load', () => {
            const response = xhr.response
            if(!response || response.error) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            }
            
        
            resolve({
                default: response.Url //업로드된 파일 주소
            })
        })
    }
    
    _sendRequest(file) {
        const data = new FormData()
        data.append('upload', file)
        this.xhr.send(data)
        console.log()
    }
}
// const dataURLtoFile = (dataurl ) => {
 
//     var arr = dataurl.split(','),
//         mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), 
//         n = bstr.length, 
//         u8arr = new Uint8Array(n);
        
//     while(n--){
//         u8arr[n] = bstr.charCodeAt(n);
//     }
    
//     return new File([u8arr], {type:mime});
// }

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader)
    }
}

export default MyCustomUploadAdapterPlugin;