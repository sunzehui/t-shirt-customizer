import pageStyle from '@/app/_styles/control.module.scss'
import { SketchPicker } from "@hello-pangea/color-picker";
import { state } from "@/app/_state";
import { useState } from 'react';
import classnames from 'classnames';
import createImage from '@/app/_ai-service/create-image';

type TabType = 'logo' | '贴图'

const setModelTexture = (activeTab: TabType, url: string) => {
  switch (activeTab) {
    case 'logo':
      state.logoTexture = url
      state.isLogoShow = true
      break;
    case '贴图':
      state.fullTexture = url
      state.isTextureShow = true
      break;
    default:
      state.isTextureShow = true
      state.fullTexture = url
      break;
  }
}

export const ColorTab = () => {
  return <>
    <SketchPicker className={`!box-border`} disableAlpha width={'100%'} color={state.color} onChange={({ hex }) => state.color = hex} />
  </>
}
export const UploadTab = () => {
  const [activeTab, setActiveTab] = useState<TabType>('logo')
  const [inputInfo, setInputInfo] = useState('上传' + activeTab)
  const [selectedFile, setSelectedFile] = useState('')
  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab)
    setInputInfo('上传' + tab)
    setSelectedFile('')
  }
  const handleUpload = (fileInputEvent: any) => {
    // get the file url
    const file = fileInputEvent.target.files[0]
    if (!file) return
    // get file name
    const fileName = file.name
    setInputInfo('已选择' + fileName)
    const url = URL.createObjectURL(file)
    // set the url to the state
    setModelTexture(activeTab, url)
  }
  return <>
    <div className={pageStyle['upload-card']}>
      <div className="tabs">
        <a onClick={() => handleTabClick('logo')} className={`tab tab-bordered ${activeTab === 'logo' ? 'tab-active' : ''}`}>LOGO</a>
        <a onClick={() => handleTabClick('贴图')} className={`tab tab-bordered ${activeTab === '贴图' ? 'tab-active' : ''}`}>贴图</a>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text text-sm">{inputInfo}</span>
        </label>
        <input type="file" className="file-input file-input-bordered w-full max-w-xs file-input-sm" value={selectedFile} onChange={handleUpload} />
      </div>

    </div>
  </>
}



export const AITab = () => {
  const [activeTab, setActiveTab] = useState<'logo' | '贴图'>('logo')
  const [btnState, setBtnState] = useState<'提交' | 'loading'>('提交')
  const [inputContent, setInputContent] = useState('')

  const handleTabClick = (tab: 'logo' | '贴图') => {
    setActiveTab(tab)
  }
  const loadingBtn = () => {
    return (
      <>
        <span className="loading loading-spinner"></span>
        loading
      </>
    )
  }
  const submitBtn = () => {
    return <>
      提交
    </>
  }
  const handleSubmit = async () => {
    setBtnState('loading')

    const photoBase64 = await createImage(inputContent)
    const url = `data:image/png;base64,${photoBase64}`
    setModelTexture(activeTab, url)

    setBtnState('提交')
  }

  return <>
    <div>
      <div className="tabs">
        <a onClick={() => handleTabClick('logo')} className={`tab tab-bordered ${activeTab === 'logo' ? 'tab-active' : ''}`}>LOGO</a>
        <a onClick={() => handleTabClick('贴图')} className={`tab tab-bordered ${activeTab === '贴图' ? 'tab-active' : ''}`}>贴图</a>
      </div>
      <div className={classnames('form-control', pageStyle['AI-card'])} >
        <label className="label">
          <span className="label-text">请输入AI提示词（生成{activeTab}）</span>
        </label>
        <textarea
          onChange={(e) => setInputContent(e.target.value)}
          className="textarea p-1 textarea-bordered h-24" placeholder="Ask AI..."></textarea>
      </div>
      <button onClick={handleSubmit} className="btn btn-outline btn-sm float-right mt-2 w-[150px]" disabled={btnState === 'loading'}>
        {btnState === '提交' ? submitBtn() : loadingBtn()}
      </button>
    </div>

  </>
}
