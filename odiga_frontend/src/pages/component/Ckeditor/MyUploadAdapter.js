class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    
    // 이미지를 업로드하는 순간 이미지를 base64url로 불러오려함
    upload() {
        return this.loader.file.then(file => new Promise(((resolve, reject) => {
            if (file.size > 5 * 1024 * 1024) { // 5MB를 바이트로 변환
                reject('이미지 크기가 5MB를 초과합니다.');
                return;
            }
            this._initRequest();
            this._initListeners(resolve, reject, file);
            this._sendRequest(file);
        })));
    }

    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/upload', true);
        xhr.responseType = 'json';
    }

    _initListeners(resolve, reject, file) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = '이미지를 업로드할 수 없습니다.';

        xhr.addEventListener('error', () => {
            reject(genericErrorText);
            alert('업로드에 실패했습니다.');
        });
        xhr.addEventListener('abort', () => reject());
        xhr.addEventListener('load', () => {
            const response = xhr.response;

            resolve({
                default: response.fileUrl // 업로드된 파일 주소
            });
        });
    }

    _sendRequest(file) {
        const data = new FormData();
        data.append('upload', file);
        this.xhr.send(data);
    }
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        return new UploadAdapter(loader);
    };
}

export default MyCustomUploadAdapterPlugin;
