from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time

# Setup: Launch browser
driver = webdriver.Firefox()  # Changed from Chrome to Firefox
driver.get("https://www.imdb.com")

# Rest of the code remains the same
search_box = driver.find_element(By.CSS_SELECTOR, "input[type='text']")
assert search_box.is_displayed(), "Test Failed: Search Box not found!"
print('Search box present!')
search_box.send_keys("The Batman")
search_box.send_keys(Keys.RETURN)  # Press Enter

time.sleep(2)  # Wait for results to load

# Step 2: Click the first search result
first_result = driver.find_element(By.CLASS_NAME, "ipc-metadata-list-summary-item__t")

print(f'First search result: {first_result.text}')

# TODO Assert finding 'The Batman' Movie 
first_result.click()
time.sleep(2)
movie_title = driver.find_element(By.CLASS_NAME, "hero__primary-text")
assert movie_title.text == "The Batman", "Test Failed: Incorrect movie page opened!"
print("Test Passed: IMDb search works correctly!")

# Cleanup: Close the browser
driver.quit()
