import React from 'react'
import { CategoryMiniCard } from '../components'


function Category() {
  const languageCardImage = "/assets/category-card-images/category-language-card-image-white.png"
  const artistCardImage = "/assets/category-card-images/category-artist-card-image-white.png"
  const GenreCardImage = "/assets/category-card-images/category-Genre-card-image-white.png"
  const MoodCardImage = "/assets/category-card-images/category-Mood-card-image-white.png"
  const headingStyle = " text-[var(--general-white)] text-sm"
  return (
    <div className='p-4 overflow-scroll h-full'>
    <h1 className={headingStyle}>Search by Language</h1>
 <div className='flex gap-3 flex-wrap m-2'> 

<CategoryMiniCard title={'English'} image={languageCardImage}/>
<CategoryMiniCard title={'Urdu'}  image={languageCardImage}/>
<CategoryMiniCard title={'Hindi'}  image={languageCardImage}/>
<CategoryMiniCard title={'Arabic'} image={languageCardImage}/>

 </div>


    <h1 className={headingStyle}>Search by Artist</h1>
 <div className='flex gap-3 flex-wrap m-2 '> 

<CategoryMiniCard title={'Atif Aslam'} image={artistCardImage}/>
<CategoryMiniCard title={'Arjit Singh'}  image={artistCardImage}/>
<CategoryMiniCard title={'NFAK'}  image={artistCardImage}/>
<CategoryMiniCard title={'Alan Walker'} image={artistCardImage}/>


 </div>


    <h1 className={headingStyle}>Search / Filter by Genre</h1>
 <div className='flex gap-3 flex-wrap m-2'> 
<CategoryMiniCard title={'Rock'} image={GenreCardImage}/>
<CategoryMiniCard title={'Qawwali'}  image={GenreCardImage}/>
<CategoryMiniCard title={'EDM'}  image={GenreCardImage}/>
<CategoryMiniCard title={'Lo-Fi'} image={GenreCardImage}/>
<CategoryMiniCard title={'Classical'} image={GenreCardImage}/>
<CategoryMiniCard title={'Acoustic'} image={GenreCardImage}/>
<CategoryMiniCard title={'Slowed'} image={GenreCardImage}/>


 </div>

    <h1 className={headingStyle}>Search by Mood / Vibe</h1>
 <div className='flex gap-3 flex-wrap m-2'> 
<CategoryMiniCard title={'Chill'} image={MoodCardImage}/>
<CategoryMiniCard title={'Romantic'}  image={MoodCardImage}/>
<CategoryMiniCard title={'Sad'}  image={MoodCardImage}/>
<CategoryMiniCard title={'Party'} image={MoodCardImage}/>

 </div>

 </div>
  )
}

export default Category