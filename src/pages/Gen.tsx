import { useState } from 'react'
import { useCoinbaseAuth } from '../hooks/useCoinbaseAuth'

const Gen = () => {
  const { isConnected } = useCoinbaseAuth()
  const [selectedWorkflow, setSelectedWorkflow] = useState('Text2Image Cartoon')
  const [selectedLoRA, setSelectedLoRA] = useState('Nishikigi Chisato [10 outfits] | Illustrious | Lycoris Recoil')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedResult, setGeneratedResult] = useState<string | null>(null)

  // Workflow options
  const workflowOptions = [
    'Text2Image Cartoon',
    'Text2Video Cartoon',
    'Image2Image Cartoon'
  ]

  // LoRA options (actual names from Home page NFTs)
  const loraOptions = [
    'Nishikigi Chisato [10 outfits] | Illustrious | Lycoris Recoil',
    'Inoue Takina [6 outfits] | Illustrious | Lycoris Recoil',
    'Illustrious Gehenna [Illustrious Checkpoint]'
  ]

  // Mock generation function
  const handleGenerate = async () => {
    if (!isConnected) {
      alert('Please sign in to generate content')
      return
    }

    setIsGenerating(true)

    // Simulate generation process
    setTimeout(() => {
      // Mock result based on workflow
      let mockResult = ''
      if (selectedWorkflow === 'Text2Image Cartoon') {
        mockResult = '/assets/images/placeholders/0.webp'
      } else if (selectedWorkflow === 'Text2Video Cartoon') {
        mockResult = '/assets/images/placeholders/1.webp'
      } else {
        mockResult = '/assets/images/placeholders/2.webp'
      }

      setGeneratedResult(mockResult)
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Generation Studio</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create stunning AI-generated content using our advanced workflows and LoRA models.
            Select your preferred workflow, choose a LoRA style, and watch the magic happen.
          </p>
        </div>

        {/* Generation Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Row 1: Two Select Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
            {/* Workflow Selection */}
            <div className="flex-1 min-w-0 max-w-xs">
              <label htmlFor="workflow" className="block text-sm font-medium text-gray-700 mb-2">
                Workflow
              </label>
              <select
                id="workflow"
                value={selectedWorkflow}
                onChange={(e) => setSelectedWorkflow(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {workflowOptions.map((workflow) => (
                  <option key={workflow} value={workflow}>
                    {workflow}
                  </option>
                ))}
              </select>
            </div>

            {/* LoRA Selection */}
            <div className="flex-1 min-w-0 max-w-xs">
              <label htmlFor="lora" className="block text-sm font-medium text-gray-700 mb-2">
                LoRA Style
              </label>
              <select
                id="lora"
                value={selectedLoRA}
                onChange={(e) => setSelectedLoRA(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {loraOptions.map((lora) => (
                  <option key={lora} value={lora}>
                    {lora}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Text Prompt Textarea */}
          <div className="mb-6 max-w-2xl mx-auto">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
              Text Prompt
            </label>
            <textarea
              id="prompt"
              placeholder="Describe what you want to generate... (e.g., 'A cute cartoon cat wearing a wizard hat, magical forest background')"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white resize-none"
              rows={4}
            />
          </div>

          {/* Row 3: Cost Estimation */}
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Estimated Cost ⚡️</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-md border">
                  <div className="text-sm text-gray-600 mb-1">To Miner</div>
                  <div className="text-lg font-semibold text-blue-600">⚡️ 0.8</div>
                  <div className="text-xs text-gray-500">For computation & processing</div>
                </div>
                <div className="bg-white p-3 rounded-md border">
                  <div className="text-sm text-gray-600 mb-1">To LoRA Owner</div>
                  <div className="text-lg font-semibold text-green-600">⚡️ 0.2</div>
                  <div className="text-xs text-gray-500">For model usage rights</div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Total Cost:</span>
                  <span className="text-lg font-bold text-primary-600">⚡️ 1.0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Generate Button */}
          <div className="text-center">
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !isConnected}
              className="btn-primary px-12 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
            >
              {isGenerating ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </div>
              ) : (
                'Generate'
              )}
            </button>
          </div>

          {/* Authentication Notice */}
          {!isConnected && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                Please sign in to access the generation features
              </p>
            </div>
          )}
        </div>

        {/* Output Preview */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Generated Output</h2>

          {isGenerating ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Creating your masterpiece...</p>
              <p className="text-sm text-gray-500 mt-2">
                Using {selectedWorkflow} with {selectedLoRA} LoRA
              </p>
            </div>
          ) : generatedResult ? (
            <div className="text-center">
              <div className="relative inline-block">
                <img
                  src={generatedResult}
                  alt="Generated result"
                  className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                  style={{ maxHeight: '500px' }}
                />
                <div className="absolute top-3 left-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm">
                  {selectedLoRA} | IL
                </div>
                <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                  ⚡️ 1
                </div>
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedWorkflow} Result
                </h3>
                <p className="text-gray-600 mb-4">
                  Generated using {selectedLoRA} LoRA style
                </p>

                <div className="flex flex-wrap gap-3 justify-center">
                  <button className="btn-primary px-6 py-2">
                    Download
                  </button>
                  <button className="btn-secondary px-6 py-2">
                    Share
                  </button>
                  <button
                    onClick={() => setGeneratedResult(null)}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="w-20 h-20 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg">No output yet</p>
              <p className="text-sm">Select your workflow and LoRA, then click Generate to create content</p>
            </div>
          )}
        </div>

        {/* Workflow Information */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {workflowOptions.map((workflow) => (
            <div key={workflow} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{workflow}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {workflow === 'Text2Image Cartoon' && 'Transform text descriptions into stunning cartoon-style images'}
                {workflow === 'Text2Video Cartoon' && 'Create animated cartoon videos from text prompts'}
                {workflow === 'Image2Image Cartoon' && 'Convert existing images into cartoon art style'}
              </p>
              <div className="text-xs text-gray-500">
                Estimated time: {workflow.includes('Video') ? '2-5 minutes' : '30 seconds - 2 minutes'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Gen