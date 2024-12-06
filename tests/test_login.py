import pytest
from page_objects.login_page import LoginPage
from page_objects.home_page import HomePage

@pytest.mark.usefixtures("driver")
class TestLogin:
    def test_successful_login(self, driver):
        login_page = LoginPage(driver)
        home_page = HomePage(driver)

        driver.get("https://example.com/login")
        login_page.login("valid_username", "valid_password")

        assert home_page.is_element_visible(home_page.WELCOME_MESSAGE)
        assert "Welcome" in home_page.get_welcome_message()

    def test_failed_login(self, driver):
        login_page = LoginPage(driver)

        driver.get("https://example.com/login")
        login_page.login("invalid_username", "invalid_password")

        assert login_page.is_element_visible(login_page.ERROR_MESSAGE)
        assert "Invalid credentials" in login_page.get_error_message()

    def test_logout(self, driver):
        login_page = LoginPage(driver)
        home_page = HomePage(driver)

        driver.get("https://example.com/login")
        login_page.login("valid_username", "valid_password")
        assert home_page.is_element_visible(home_page.WELCOME_MESSAGE)

        home_page.logout()
        assert login_page.is_element_visible(login_page.USERNAME_INPUT)