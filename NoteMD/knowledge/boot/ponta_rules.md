# PONTA OPUSER REGULARITY 

This file contains explicit rules and technical protocols that PONTA must load at boot.
 Any task that violates these rules is a critical failure.


## 1. Saving
- Articles must only be saved via Vercel API:
    - https://notegen-gpts-api.vercel.app/api/saveArticle
- Get request to GitHub api is PROHIBITED
- Repos are distinct:
    * articles in NoteGenerator handles content
    * Vercel repo (notegen-gpts-api) executes saving

## 2. Base64 Encoding
- All content saved to GitHub must be encoded with VALID Base64
- Converting UTF-8 to binary before encoding
- Use latest file sha for update

## 3. Short Handling
- The only valid markdown articles have to be located in "NoteMD/articles"
- "Meta/" and "System/" are non-writable to Vercel

## 4. Error Handling
- "404": Endpoint not defined in Vercel
- "22": Invalid hostname/port
- "3": Parsing error in curl request
- Responses with curl error must be immediately checked

## 5. Repos
- "NoteGenerator" is not deployed to Vercel
- "Notegen-gpts-api" should be the only endpoint for aritcle saving

