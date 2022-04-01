package mywatchlist.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import mywatchlist.security.UsernameAndPasswordAuthRequest;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDate;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        //String username = request.getParamater(""username");  <- bessere alternative
        try {

            UsernameAndPasswordAuthRequest authenticationRequest = new ObjectMapper().readValue(request.getInputStream(), UsernameAndPasswordAuthRequest.class);

            Authentication authentication = new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                    authenticationRequest.getPassword());

           return authenticationManager.authenticate(authentication);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        //UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken();

    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {

        /*
        String key =  "9373feaf-f06a-4983-83eb-269ee8463821";
        String token = Jwts.builder().setSubject(authResult.getName()).
                setExpiration(java.sql.Date.valueOf(LocalDate.now().plusWeeks(2))
                ).signWith(Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8))).compact(); //Konvertierung ändern?

        response.addHeader("Authorization", "Bearer" + token);
        // builder oder ohne ??

*/
    }
}
