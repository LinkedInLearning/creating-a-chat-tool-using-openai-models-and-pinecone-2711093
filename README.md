# Creating a Chat Tool Using OpenAI Models and Pinecone
This is the repository for the LinkedIn Learning course `Creating a Chat Tool Using OpenAI Models and Pinecone`. The full course is available from [LinkedIn Learning][lil-course-url].

![lil-thumbnail-url]

Embeddings and vector databases allow developers to create tools that can retrieve knowledge from custom documents and use it to form more accurate and dynamic conversations. But while cutting-edge AI models like ChatGPT can generate useful conversational responses to many different kinds of queries, the replies are always limited to the data that was available when the model was last trained. In this course,  instructor Guil Hernandez offers an overview of text embeddings, vector databases, and retrieval-augmented generation (RAG) to elevate and optimize your AI learning journey. Along the way, test out your new skills in the exercise challenges provided at the end of each section.

_See the readme file in the main branch for updated instructions and information._
## Instructions
This repository has branches for each of the videos in the course. You can use the branch pop up menu in github to switch to a specific branch and take a look at the course at that stage, or you can add `/tree/BRANCH_NAME` to the URL to go to the branch you want to access.

## Branches
The branches are structured to correspond to the videos in the course. The naming convention is `CHAPTER#_MOVIE#`. As an example, the branch named `02_03` corresponds to the second chapter and the third video in that chapter. 
Some branches will have a beginning and an end state. These are marked with the letters `b` for "beginning" and `e` for "end". The `b` branch contains the code as it is at the beginning of the movie. The `e` branch contains the code as it is at the end of the movie. The `main` branch holds the final state of the code when in the course.

When switching from one exercise files branch to the next after making changes to the files, you may get a message like this:

    error: Your local changes to the following files would be overwritten by checkout:        [files]
    Please commit your changes or stash them before you switch branches.
    Aborting

To resolve this issue:
	
    Add changes to git using this command: git add .
	Commit changes using this command: git commit -m "some message"

## Installing
1. To use these exercise files, you must have the following installed:
	- [Node.js](https://nodejs.org/en/)
2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.
3. Run `npm install` to install all project dependencies, then `npm run dev` to run and launch the app

### Instructor

Guil Hernandez

Software Developer and Educator.

                            

Check out my other courses on [LinkedIn Learning](https://www.linkedin.com/learning/instructors/guil-hernandez?u=104).

[0]: # (Replace these placeholder URLs with actual course URLs)

[lil-course-url]: https://www.linkedin.com/learning/creating-a-chat-tool-using-openai-models-and-pinecone
[lil-thumbnail-url]: https://media.licdn.com/dms/image/D560DAQFM81Cvq9_tig/learning-public-crop_675_1200/0/1719007438597?e=2147483647&v=beta&t=K6x-FmslNxTRTspWwOntk8RuQiH6zWW3LBXBCjjUiRI

