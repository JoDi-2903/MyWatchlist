package mywatchlist.model.hibernate;

import javax.persistence.*;

@Entity
@Table(name = "title_type")
public class TitleType {

    @Id
    @GeneratedValue
    @Column(name = "title_type_id")
    private short titleTypeId;
    @Column(name = "name", nullable = false)
    private String name;

    public int getTitleTypeId() {
        return titleTypeId;
    }

    public void setTitleTypeId(short titleTypeId) {
        this.titleTypeId = titleTypeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
