import pytest
from page_objects.login_page import LoginPage
from page_objects.home_page import HomePage

@pytest.mark.usefixtures("driver")
class TestNavigation:
    @pytest.fixture(autouse=True)
    def setup(self, driver):
        login_page = LoginPage(driver)
        driver.get("https://example.com/login")
        login_page.login("valid_username", "valid_password")
        self.home_page = HomePage(driver)

    def test_navigate_to_profile(self):
        self.home_page.navigate_to_section("Profile")
        assert "profile" in self.home_page.driver.current_url.lower()

    def test_navigate_to_settings(self):
        self.home_page.navigate_to_section("Settings")
        assert "settings" in self.home_page.driver.current_url.lower()

    def test_navigate_to_nonexistent_section(self):
        with pytest.raises(ValueError):
            self.home_page.navigate_to_section("Nonexistent Section")