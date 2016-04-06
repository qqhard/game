package crazy;

import java.io.IOException;

import org.junit.Test;

public class TestSmallImg {
	@Test
	public void test() {
		boolean flag = fetch("http://domain.com/theme/umbreo/hitwh","/tmp/test.png");
		System.out.println(flag);
		flag = shrink("/tmp/test.png","/home/hard/Project/game/web/static/umbreo/index.png");
		System.out.println(flag);
	}

	private boolean fetch(String url, String path) {
		String cmd = String.format("cutycapt --url=%s --out=%s --max-wait=5000 --delay=3000", url, path);
		Runtime run = Runtime.getRuntime();
		Process process = null;
		try {
			process = run.exec(cmd);
		} catch (IOException e1) {
			return false;
		}
		try {
			if (process.waitFor() != 0) {
				if (process.exitValue() == 1) {
					return false;
				}
			}
		} catch (InterruptedException e) {
			return false;
		}
		return true;
	}

	private boolean shrink(String from, String to) {
		String cmd = String.format("convert -crop 1900x860+0+0 %s %s", from, to);
		Runtime run = Runtime.getRuntime();
		Process process = null;
		try {
			process = run.exec(cmd);
		} catch (IOException e1) {
			return false;
		}
		try {
			if (process.waitFor() != 0) {
				if (process.exitValue() == 1) {
					return false;
				}
			}
		} catch (InterruptedException e) {
			return false;
		}
		return true;
	}

}
