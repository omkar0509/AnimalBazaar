package in.sp.main.login;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
//import org.testng.annotations.Test;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;

public class LoginTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeTest
    public void setup() {
        WebDriverManager.chromedriver().setup();
        ChromeOptions options = new ChromeOptions();
        options.setBinary("C:\\Users\\Acer\\Downloads\\chrome-win64\\chrome-win64\\chrome.exe");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        driver.get("http://localhost:3000/login");
    }

    @Test
    public void testSuccessfulLogin() throws InterruptedException {
        driver.findElement(By.id("username")).sendKeys("rannm");
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys("1nn23");
        Thread.sleep(1000);
        driver.findElement(By.cssSelector("button[type='submit']")).click();
        Thread.sleep(1000);

        wait.until(ExpectedConditions.urlContains("/dashboard"));
        Assert.assertTrue(driver.getCurrentUrl().contains("/dashboard"), "Login failed, not redirected to dashboard!");
    }

    @Test
    public void testInvalidLogin() throws InterruptedException {
        driver.findElement(By.id("username")).sendKeys("rannm");
        Thread.sleep(1000);
        driver.findElement(By.id("password")).sendKeys("1nn23");
        Thread.sleep(1000);
        driver.findElement(By.cssSelector("button[type='submit']")).click();
        Thread.sleep(1000);

        wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("alert-danger")));
        Assert.assertTrue(driver.findElement(By.className("alert-danger")).isDisplayed(), 
                          "Error message not displayed for invalid login!");
    }

    @AfterTest
    public void teardown() {
        if (driver != null) {
            driver.close();
        }
    }
}