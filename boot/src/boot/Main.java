package boot;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;

public class Main {

	public static void main(String[] args) throws AWTException {
		// TODO Auto-generated method stub
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
	static void open(Robot robot) {
		robot.keyPress(KeyEvent.VK_CONTROL);
		robot.keyPress(KeyEvent.VK_ALT);
		robot.keyPress(KeyEvent.VK_T);
		robot.keyRelease(KeyEvent.VK_T);
		robot.keyRelease(KeyEvent.VK_CONTROL);
		robot.keyRelease(KeyEvent.VK_ALT);
	}
	
	static void open2(Robot robot) {
		robot.keyPress(KeyEvent.VK_CONTROL);
		robot.keyPress(KeyEvent.VK_SHIFT);
		robot.keyPress(KeyEvent.VK_T);
		robot.keyRelease(KeyEvent.VK_T);
		robot.keyRelease(KeyEvent.VK_CONTROL);
		robot.keyRelease(KeyEvent.VK_SHIFT);
	}

	static void cmd(String path, Robot robot) {
		for(int i=0;i<path.length();i++){
			int ch = Character.valueOf(path.substring(i,i+1).toCharArray()[0]);//ASCII
			if(ch >= 97 && ch <=122) small(robot, ch - 32);
			else if(ch >= 65 && ch <= 96) big(robot, ch);
			else if(ch == 58) big(robot, KeyEvent.VK_COLON);
			else {
				small(robot, ch);
			}
			
		}
	}

	static void small(Robot robot, int ch) {
		robot.keyPress(ch);
		robot.keyRelease(ch);
	}

	static void big(Robot robot, int ch) {
		robot.keyPress(KeyEvent.VK_SHIFT);
		robot.keyPress(ch);
		robot.keyRelease(ch);
		robot.keyRelease(KeyEvent.VK_SHIFT);
	}
}
