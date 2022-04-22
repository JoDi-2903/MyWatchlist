package mywatchlist.model.dto;

public class ChangeUserSettingsDto {

    private String username;
    private String email;
    private String password;
    private boolean isPrivateProfile;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isPrivateProfile() {
        return isPrivateProfile;
    }

    public void setPrivateProfile(boolean privateProfile) {
        isPrivateProfile = privateProfile;
    }
}
