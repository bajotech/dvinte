import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TopNav from '~/components/TopNav'
// import Notifications from '~/components/Notifications';

import { Container, Content, Profile } from './styles'

export default function Header() {
  const profile = useSelector(state => state.user.profile)

  return (
    <Container>
      <Content>
        <TopNav />

        <aside>
          {/* <Notifications /> */}

          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt=""
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
