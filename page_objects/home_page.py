from .base_page import BasePage
from selenium.webdriver.common.by import By

class HomePage(BasePage):
    WELCOME_MESSAGE = (By.CLASS_NAME, "welcome-message")
    LOGOUT_BUTTON = (By.ID, "logout")
    NAVIGATION_MENU = (By.ID, "nav-menu")
    MENU_ITEMS = (By.CSS_SELECTOR, "#nav-menu li")

    def __init__(self, driver):
        super().__init__(driver)

    def get_welcome_message(self):
        return self.get_text(self.WELCOME_MESSAGE)

    def logout(self):
        self.click_element(self.LOGOUT_BUTTON)

    def navigate_to_section(self, section_name):
        menu_items = self.find_elements(self.MENU_ITEMS)
        for item in menu_items:
            if item.text.lower() == section_name.lower():
                item.click()
                break
        else:
            raise ValueError(f"Section '{section_name}' not found in navigation menu")