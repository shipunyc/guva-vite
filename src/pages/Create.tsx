import { useState } from 'react'

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  preview?: string
}

const Create = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'train'>('upload')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [rentPrice, setRentPrice] = useState('')
  const [loraName, setLoraName] = useState('')
  const [loraDescription, setLoraDescription] = useState('')
  const [trainingImages, setTrainingImages] = useState<UploadedFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [isTraining, setIsTraining] = useState(false)

  // Mock file upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newFiles: UploadedFile[] = Array.from(files).map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }))

    setUploadedFiles(newFiles)
  }

  // Mock training images upload handler
  const handleTrainingImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    if (files.length > 15) {
      alert('Maximum 15 images allowed for training')
      return
    }

    const newImages: UploadedFile[] = Array.from(files).map((file, index) => ({
      id: `training-${Date.now()}-${index}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      type: file.type,
      preview: URL.createObjectURL(file)
    }))

    setTrainingImages(newImages)
  }

  // Mock mint NFT handler
  const handleMintNFT = async () => {
    if (!loraName.trim() || !rentPrice.trim() || uploadedFiles.length === 0) {
      alert('Please fill in all required fields and upload a LoRA file')
      return
    }

    setIsUploading(true)

    // Simulate minting process
    setTimeout(() => {
      alert(`LoRA "${loraName}" minted successfully as NFT with rent price ⚡️ ${rentPrice}!`)
      setIsUploading(false)
      // Reset form
      setLoraName('')
      setRentPrice('')
      setUploadedFiles([])
    }, 2000)
  }

  // Mock train LoRA handler
  const handleTrainLoRA = async () => {
    if (!loraName.trim() || trainingImages.length === 0) {
      alert('Please provide a LoRA name and upload training images')
      return
    }

    if (trainingImages.length < 5) {
      alert('Minimum 5 images required for training')
      return
    }

    setIsTraining(true)

    // Simulate training process
    setTimeout(() => {
      alert(`LoRA "${loraName}" training started! This may take several hours.`)
      setIsTraining(false)
      // Reset form
      setLoraName('')
      setTrainingImages([])
    }, 2000)
  }

  const removeFile = (id: string, isTraining = false) => {
    if (isTraining) {
      setTrainingImages(prev => prev.filter(file => file.id !== id))
    } else {
      setUploadedFiles(prev => prev.filter(file => file.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create LoRA</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload existing LoRAs or train new ones from scratch. Share your AI models with the community and earn ⚡️.
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'upload'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                📤 Upload LoRA
              </button>
              <button
                onClick={() => setActiveTab('train')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'train'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                🎯 Train New LoRA
              </button>
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'upload' ? (
              /* Upload Tab */
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Existing LoRA</h2>
                  <p className="text-gray-600">Upload your LoRA file and set a rental price to earn ⚡️</p>
                </div>

                {/* LoRA Details Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="loraName" className="block text-sm font-medium text-gray-700 mb-2">
                      LoRA Name *
                    </label>
                    <input
                      type="text"
                      id="loraName"
                      value={loraName}
                      onChange={(e) => setLoraName(e.target.value)}
                      placeholder="Enter a descriptive name for your LoRA"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="rentPrice" className="block text-sm font-medium text-gray-700 mb-2">
                      Rent Price (⚡️) *
                    </label>
                    <input
                      type="number"
                      id="rentPrice"
                      value={rentPrice}
                      onChange={(e) => setRentPrice(e.target.value)}
                      placeholder="0.00"
                      step="0.1"
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="loraDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="loraDescription"
                    value={loraDescription}
                    onChange={(e) => setLoraDescription(e.target.value)}
                    placeholder="Describe what your LoRA does, its style, or any special features..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LoRA File *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <input
                      type="file"
                      accept=".safetensors,.bin,.pt,.pth"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="loraFile"
                    />
                    <label htmlFor="loraFile" className="cursor-pointer">
                      <div className="text-6xl mb-4">📁</div>
                      <div className="text-lg font-medium text-gray-900 mb-2">Click to upload LoRA file</div>
                      <div className="text-sm text-gray-500">Supports .safetensors, .bin, .pt, .pth files</div>
                    </label>
                  </div>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Uploaded Files</h3>
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">📄</div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-xs text-gray-500">{file.size}</div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mint Button */}
                <div className="text-center">
                  <button
                    onClick={handleMintNFT}
                    disabled={isUploading || !loraName.trim() || !rentPrice.trim() || uploadedFiles.length === 0}
                    className="btn-primary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Minting NFT...</span>
                      </div>
                    ) : (
                      '🚀 Mint LoRA as NFT'
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* Train Tab */
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Train New LoRA</h2>
                  <p className="text-gray-600">Upload up to 15 images to train a custom LoRA from scratch</p>
                </div>

                {/* LoRA Details Form */}
                <div>
                  <label htmlFor="trainLoraName" className="block text-sm font-medium text-gray-700 mb-2">
                    LoRA Name *
                  </label>
                  <input
                    type="text"
                    id="trainLoraName"
                    value={loraName}
                    onChange={(e) => setLoraName(e.target.value)}
                    placeholder="Enter a name for your new LoRA"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Training Images Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Training Images * (5-15 images)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleTrainingImagesUpload}
                      className="hidden"
                      id="trainingImages"
                    />
                    <label htmlFor="trainingImages" className="cursor-pointer">
                      <div className="text-6xl mb-4">🖼️</div>
                      <div className="text-lg font-medium text-gray-900 mb-2">Click to upload training images</div>
                      <div className="text-sm text-gray-500">Upload 5-15 high-quality images (JPG, PNG, WebP)</div>
                    </label>
                  </div>
                </div>

                {/* Uploaded Training Images */}
                {trainingImages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Training Images ({trainingImages.length}/15)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {trainingImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.preview}
                            alt={image.name}
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <button
                            onClick={() => removeFile(image.id, true)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Training Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="text-blue-500 text-xl">ℹ️</div>
                    <div>
                      <h4 className="text-sm font-medium text-blue-900 mb-1">Training Information</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Minimum 5 images required for training</li>
                        <li>• Training may take several hours</li>
                        <li>• You'll be notified when training is complete</li>
                        <li>• Trained LoRA will be automatically minted as NFT</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Train Button */}
                <div className="text-center">
                  <button
                    onClick={handleTrainLoRA}
                    disabled={isTraining || !loraName.trim() || trainingImages.length < 5}
                    className="btn-primary px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isTraining ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Starting Training...</span>
                      </div>
                    ) : (
                      '🎯 Start Training LoRA'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create