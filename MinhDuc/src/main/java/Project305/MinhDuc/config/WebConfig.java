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
                .allowedOrigins("http://localhost:8080/src/main/resources/static/index.html") // Frontend URL
                .allowedMethods("GET", "POST");
    }
}