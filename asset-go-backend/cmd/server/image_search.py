# @misc{TechyNilesh/DeepImageSearch,
#   author = {VERMA, NILESH},
#   title = {Deep Image Search - AI-Based Image Search Engine},
#   year = {2021},
#   publisher = {GitHub},
#   journal = {GitHub repository},
#   howpublished = {\url{https://github.com/TechyNilesh/DeepImageSearch}},
# }

from DeepImageSearch import Load_Data, Search_Setup
from PIL import Image
import matplotlib.pyplot as plt
from unittest.mock import patch

image_list = Load_Data().from_folder(['../images'])
print(image_list)

st = Search_Setup(image_list = image_list, model_name='efficientnet_b0', pretrained=True, image_count=None)
with patch('builtins.input', return_value='yes'):
    # Call the method that prompts for extraction
    st.run_index()

#metadata = st.get_image_metadata_file()

similar_images = st.get_similar_images(image_path='../test/people.jpg', number_of_images=10)
print("Similar Images:")
for img_path, score in similar_images.items():  # Iterate over the dictionary
    print(f"Image Path: {score}")
    #img = Image.open(score)
    #img.show()

#st.plot_similar_images(image_path='../test/testing_resized.png', number_of_images=5)

