package crazy.config;

public class Common {
	private static String gameWebPage = null;
	private static String gameWebStatic = null;
	public static String GameWebPage(){
		if(gameWebPage == null)gameWebPage = System.getenv("GAME_WEB_PAGE")+"/";
		return gameWebPage;
	}
	public static String GameWebStatic(){
		if(gameWebStatic == null)gameWebStatic = System.getenv("GAME_WEB_STATIC")+"/";
		return gameWebStatic;
	}
}
