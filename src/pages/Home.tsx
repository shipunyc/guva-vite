import { useState } from 'react'

const Home = () => {
  const [selectedTag, setSelectedTag] = useState('All')

  const tags = ['All', 'Character', 'Style', 'Background']

  const mockNFTs = [
    {
      id: 1,
      name: 'Nishikigi Chisato [10 outfits] | Illustrious | Lycoris Recoil',
      image: '/assets/images/placeholders/0.webp',
      creator: 'LittleJelly'
    },
    {
      id: 2,
      name: 'Inoue Takina [6 outfits] | Illustrious | Lycoris Recoil',
      image: '/assets/images/placeholders/1.webp',
      creator: 'MidnightDream'
    },
    {
      id: 3,
      name: 'Illustrious Gehenna [Illustrious Checkpoint]',
      image: '/assets/images/placeholders/2.webp',
      creator: 'Hulda'
    },
  ]

  return (
    <div className="space-y-8">

      {/* Tags */}
      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedTag === tag
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockNFTs.map((nft) => (
          <div key={nft.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
            <div className="h-[500px] overflow-hidden">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {/* Tag */}
              <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium opacity-100 transition-opacity duration-200">
                LoRA | IL
              </div>
              <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium opacity-100 transition-opacity duration-200">
                ⚡️ 1
              </div>
              {/* Name & Creator */}
              <div className="absolute bottom-3 left-3 text-white px-2 py-1 text-lg font-medium opacity-100 transition-opacity duration-200 drop-shadow-lg">
                <div className="flex items-center text-sm font-medium opacity-100 transition-opacity duration-200 drop-shadow-lg mb-1">
                  <div className="w-5 h-5 rounded-full bg-gray-300 mr-2 flex-shrink-0"></div>
                  {nft.creator}
                </div>
                <div className="text-lg font-medium opacity-100 transition-opacity duration-200 drop-shadow-lg">
                  {nft.name}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home