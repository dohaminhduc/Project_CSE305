package Project305.MinhDuc.request;

public class LoginRequest {
    private Long identityNumber;
    private String password;

    public Long getIdentityNumber() { return identityNumber; }
    public void setIdentityNumber(Long identityNumber) { this.identityNumber = identityNumber; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}