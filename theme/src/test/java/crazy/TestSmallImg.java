package crazy;

import java.awt.AWTException;
import java.awt.Desktop;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.event.KeyEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;

import javax.imageio.ImageIO;

import org.junit.Test;

public class TestSmallImg {
	// @Test
	// public void test() throws MalformedURLException, IOException,
	// URISyntaxException, AWTException {
	// Desktop.getDesktop().browse(new
	// URL("http://domain.com/theme/diobox/hitwh").toURI());
	// Robot robot = new Robot();
	// robot.delay(10000);
	// Dimension d = new Dimension(Toolkit.getDefaultToolkit().getScreenSize());
	// int width = (int) d.getWidth();
	// int height = (int) d.getHeight();
	// // 最大化浏览器
	// robot.keyRelease(KeyEvent.VK_F11);
	// robot.delay(2000);
	// Image image = robot.createScreenCapture(new Rectangle(0, 0, width,
	// height));
	// BufferedImage bi = new BufferedImage(width, height,
	// BufferedImage.TYPE_INT_RGB);
	// Graphics g = bi.createGraphics();
	// g.drawImage(image, 0, 0, width, height, null);
	// // 保存图片
	// ImageIO.write(bi, "jpg", new File("/home/hard/test.jpg"));
	// }

	@Test
	public void tecst2() throws AWTException {
		Robot robot = new Robot();
		open(robot);
		robot.delay(300);
		cmd("cd Project/game/user\n", robot);
		cmd("mvn spring-boot:run\n", robot);
		robot.delay(300);
		open2(robot);
		robot.delay(300);
		cmd("cd ../game\n", robot);
		cmd("mvn spring-boot:run\n", robot);
		robot.delay(300);
		open2(robot);
		robot.delay(300);
		cmd("cd ../message\n", robot);
		cmd("mvn spring-boot:run\n", robot);
		robot.delay(300);
		open2(robot);
		robot.delay(300);
		cmd("cd ../theme\n", robot);
		cmd("mvn spring-boot:run\n", robot);
	}

	private void open(Robot robot) {
		robot.keyPress(KeyEvent.VK_CONTROL);
		robot.keyPress(KeyEvent.VK_ALT);
		robot.keyPress(KeyEvent.VK_T);
		robot.keyRelease(KeyEvent.VK_T);
		robot.keyRelease(KeyEvent.VK_CONTROL);
		robot.keyRelease(KeyEvent.VK_ALT);
	}
	
	private void open2(Robot robot) {
		robot.keyPress(KeyEvent.VK_CONTROL);
		robot.keyPress(KeyEvent.VK_SHIFT);
		robot.keyPress(KeyEvent.VK_T);
		robot.keyRelease(KeyEvent.VK_T);
		robot.keyRelease(KeyEvent.VK_CONTROL);
		robot.keyRelease(KeyEvent.VK_SHIFT);
	}

	private void cmd(String path, Robot robot) {
		for(int i=0;i<path.length();i++){
			int ch = Character.valueOf(path.substring(i,i+1).toCharArray()[0]);//ASCII
			System.out.println(ch);
			if(ch >= 97 && ch <=122) small(robot, ch - 32);
			else if(ch >= 65 && ch <= 96) big(robot, ch);
			else if(ch == 58) big(robot, KeyEvent.VK_COLON);
			else {
				small(robot, ch);
			}
			
		}
	}

	private void small(Robot robot, int ch) {
		robot.keyPress(ch);
		robot.keyRelease(ch);
	}

	private void big(Robot robot, int ch) {
		robot.keyPress(KeyEvent.VK_SHIFT);
		robot.keyPress(ch);
		robot.keyRelease(ch);
		robot.keyRelease(KeyEvent.VK_SHIFT);
	}
}
