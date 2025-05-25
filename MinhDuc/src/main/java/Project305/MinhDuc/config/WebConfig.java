package Project305.MinhDuc.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") 
                .allowedOrigins("*")
                .allowedOrigins("http://127.0.0.1:5500/src/main/resources/static/index.html") // Frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}