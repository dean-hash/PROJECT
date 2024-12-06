from selenium.webdriver.support.ui import WebDriverWait
from selenium.common.exceptions import TimeoutException

class CustomWait(WebDriverWait):
    def until_not_stale(self, locator, timeout=10):
        def check_staleness(driver):
            try:
                driver.find_element(*locator)
                return False
            except:
                return True

        try:
            return self.until(check_staleness)
        except TimeoutException:
            raise TimeoutException(f"Element {locator} is still stale after {timeout} seconds")

    def until_text_to_be_present_in_element(self, locator, text, timeout=10):
        def check_text(driver):
            try:
                element = driver.find_element(*locator)
                return text in element.text
            except:
                return False

        try:
            return self.until(check_text)
        except TimeoutException:
            raise TimeoutException(f"Text '{text}' not found in element {locator} after {timeout} seconds")