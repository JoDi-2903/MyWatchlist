package mywatchlist.repository;

import mywatchlist.model.hibernate.TitleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitleTypeRepo extends JpaRepository<TitleType, Short> {
}
