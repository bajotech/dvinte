import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '~/services/api'
// import CharClass from '~/components/CharClass'

import {
  Container,
  HeaderContainer,
  Portrait,
  BaseContainer,
  LineContaniner,
  InputShort,
  InputMed,
  InputLarge,
  StatsContainer,
  AttributesContainer,
  AttrLabel,
  AttrLabel1,
  HealthClassContainer,
  HealthContainer,
  ClassContainer,
  ClassInput,
  ClassValueInput,
  ResistContainer,
  MainResistContainer,
  DefenseContainer,
  LabelContainer,
  ResistMainLabel,
  DefenseMainLabel,
  ResistLabel,
  InputResitContainer,
  InputResit,
  InputDefense,
  ArmoryContainer,
  ArmorContainer,
  WeaponContainer,
  InputLargeArmory,
  InputMedArmory,
} from './styles'

export default function CharacterView() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [char, setChar] = useState()
  const [classes, setClasses] = useState([])
  const [armors, setArmors] = useState([])
  const [weapons, setWepons] = useState([])
  // const [newClass, setNewClass] = useState({})

  async function loadChar() {
    const response = await api.get(`characters/${id}`)

    setChar(response.data && response.data.charData)
    setClasses(response.data && response.data.Classes)
    setArmors(response.data && response.data.Armor)
    setWepons(response.data && response.data.Weapon)
    // console.log(response.data)

    // const classesArray = response.data && response.data.Classes
    // setClasses(classesArray)
    // setNewClass(classesArray[0])
    setLoading(false)
  }

  useEffect(() => {
    loadChar()
  }, []) // eslint-disable-line

  return (
    <Container loading={loading ? 1 : 0}>
      <HeaderContainer>
        <legend>Dados Básicos</legend>
        <div>
          <Portrait>
            <img src={char && char.Portrait} alt="" />
          </Portrait>

          <BaseContainer>
            <LineContaniner>
              <div>
                <InputLarge defaultValue={char && char.Name} />
                <label htmlFor="CharName">Nome do Personagem</label>
              </div>

              <div>
                <InputLarge defaultValue={char && char.User} />
                <label htmlFor="CharName">Nome do Jogador</label>
              </div>

              <div>
                <InputLarge defaultValue={char && char.Race} />
                <label htmlFor="CharRace">Raça</label>
              </div>
              <div>
                <InputLarge defaultValue={char && char.Alig} />
                <label htmlFor="CharAlignment">Tendência</label>
              </div>
            </LineContaniner>

            <LineContaniner>
              <div>
                <InputShort defaultValue={char && char.Age} />
                <label htmlFor="CharAge">Idade</label>
              </div>

              <div>
                <InputMed defaultValue={char && char.Gender} />
                <label htmlFor="CharGender">Sexo</label>
              </div>
              <div>
                <InputMed defaultValue={char && char.Size} />
                <label htmlFor="CharSize">Tamanho</label>
              </div>
              <div>
                <InputLarge defaultValue={char && char.Divin} />
                <label htmlFor="CharDivinity">Divindade</label>
              </div>
            </LineContaniner>

            <LineContaniner>
              <div>
                <InputShort defaultValue={char && char.Height} />
                <label htmlFor="CharHeight">Altura</label>
              </div>
              <div>
                <InputShort defaultValue={char && char.Weight} />
                <label htmlFor="CharWeight">Peso</label>
              </div>
              <div>
                <InputMed defaultValue={char && char.Eye} />
                <label htmlFor="CharEye">Olhos</label>
              </div>
              <div>
                <InputMed defaultValue={char && char.Hair} />
                <label htmlFor="CharHair">Cabelos</label>
              </div>
              <div>
                <InputMed defaultValue={char && char.Skin} />
                <label htmlFor="CharSkin">Pele</label>
              </div>
            </LineContaniner>
          </BaseContainer>
        </div>
      </HeaderContainer>

      <StatsContainer>
        <AttributesContainer>
          <legend>Atributos</legend>
          <div>
            <AttrLabel1 defaultValue="FOR" />
            <div>
              <label htmlFor="inputResist">valor</label>
              <input defaultValue={char && char.Str} />
            </div>
            <div>
              <label htmlFor="inputResist">mod</label>
              <input defaultValue={char && char.StrMod} />
            </div>
            <div>
              <label htmlFor="inputResist">v.temp</label>
              <input defaultValue="" />
            </div>
            <div>
              <label htmlFor="inputResist">m.temp</label>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="DES" />
            <div>
              <input defaultValue={char && char.Des} />
            </div>
            <div>
              <input defaultValue={char && char.DesMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="CON" />
            <div>
              <input defaultValue={char && char.Con} />
            </div>
            <div>
              <input defaultValue={char && char.ConMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="INT" />
            <div>
              <input defaultValue={char && char.Int} />
            </div>
            <div>
              <input defaultValue={char && char.IntMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="SAB" />
            <div>
              <input defaultValue={char && char.Sab} />
            </div>
            <div>
              <input defaultValue={char && char.SabMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>

          <div>
            <AttrLabel defaultValue="CAR" />
            <div>
              <input defaultValue={char && char.Car} />
            </div>
            <div>
              <input defaultValue={char && char.CarMod} />
            </div>
            <div>
              <input defaultValue="" />
            </div>
            <div>
              <input defaultValue="" />
            </div>
          </div>
        </AttributesContainer>

        <HealthClassContainer>
          <legend>Classes e Level</legend>
          <HealthContainer>
            <div>
              <div>
                <InputShort defaultValue={char && char.Level} />
                <label htmlFor="CharLevel">Level</label>
              </div>
              <div>
                <InputShort defaultValue={char && char.Exp} />
                <label htmlFor="charExp">Experiência</label>
              </div>
            </div>
            <div>
              <div>
                <InputShort defaultValue={char && char.Health} />
                <label htmlFor="charHealth">Pontos de Vida</label>
              </div>
              <div>
                <InputShort defaultValue={char && char.HealthNow} />
                <label htmlFor="charHealth">Vida Atual</label>
              </div>
            </div>
          </HealthContainer>

          <ClassContainer>
            <ul>
              {classes.map((item, index) => (
                // eslint-disable-next-line
                <li key={index}>
                  <ClassInput defaultValue={item.name} />
                  <ClassValueInput defaultValue={item.level} />
                </li>
              ))}
            </ul>
          </ClassContainer>
        </HealthClassContainer>

        <ResistContainer>
          <legend>Testes de Resistência</legend>

          <MainResistContainer>
            <LabelContainer>
              <ResistMainLabel defaultValue="FORTITUDE" />
              <ResistLabel defaultValue="(Constituição)" />
            </LabelContainer>
            <InputResitContainer>
              <div>
                <label htmlFor="inputResist">total</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">base</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">mod</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">magic</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">outros</label>
                <InputResit defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">temp</label>
                <InputResit defaultValue="" />
              </div>
            </InputResitContainer>
          </MainResistContainer>

          <MainResistContainer>
            <LabelContainer>
              <ResistMainLabel defaultValue="REFLEXOS" />
              <ResistLabel defaultValue="(Destreza)" />
            </LabelContainer>
            <InputResitContainer>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
            </InputResitContainer>
          </MainResistContainer>

          <MainResistContainer>
            <LabelContainer>
              <ResistMainLabel defaultValue="VONTADE" />
              <ResistLabel defaultValue="(Sabedoria)" />
            </LabelContainer>
            <InputResitContainer>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
              <div>
                <InputResit defaultValue="" />
              </div>
            </InputResitContainer>
          </MainResistContainer>

          <DefenseContainer>
            <InputResitContainer>
              <div>
                <DefenseMainLabel defaultValue="CA" />
              </div>

              <div>
                <label htmlFor="inputResist">total</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">armad</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">escudo</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">dest</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">tam</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">arm tot</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">deflex</label>
                <InputDefense defaultValue="" />
              </div>
              <div>
                <label htmlFor="inputResist">outros</label>
                <InputDefense defaultValue="" />
              </div>
            </InputResitContainer>
          </DefenseContainer>
        </ResistContainer>
      </StatsContainer>
      <ArmoryContainer>
        <ArmorContainer>
          <legend>Armaduras e Escudos</legend>
          <div>
            <ul>
              {armors.map((item, index) => (
                // eslint-disable-next-line
                <li key={index}>
                  <div>
                    <label htmlFor="inputResist">Nome</label>
                    <InputLargeArmory defaultValue={item.name} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Tipo</label>
                    <input defaultValue={item.type} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Bonus</label>
                    <input defaultValue={item.bonus} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Dest Max</label>
                    <input defaultValue={item.dexterity} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Penalidade</label>
                    <input defaultValue={item.penalty} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Deslocamento</label>
                    <input defaultValue={item.displacement} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Peso</label>
                    <input defaultValue={item.weight} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Especial</label>
                    <InputMedArmory defaultValue={item.special} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Preço</label>
                    <InputMedArmory defaultValue={item.price} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ArmorContainer>
      </ArmoryContainer>
      <ArmoryContainer>
        <WeaponContainer>
          <legend>Armas</legend>
          <div>
            <ul>
              {weapons.map((item, index) => (
                // eslint-disable-next-line
                <li key={index}>
                  <div>
                    <label htmlFor="inputResist">Nome</label>
                    <InputLargeArmory defaultValue={item.name} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Qtde</label>
                    <input defaultValue={item.multiplier} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Dados</label>
                    <input defaultValue={item.dice} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Crítico</label>
                    <InputMedArmory defaultValue={item.critical} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Alcance</label>
                    <input defaultValue={item.range} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Tipo</label>
                    <InputMedArmory defaultValue={item.type} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Material</label>
                    <InputMedArmory defaultValue={item.material} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Mágico</label>
                    <InputMedArmory defaultValue={item.magic} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Peso</label>
                    <input defaultValue={item.weight} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Especial</label>
                    <InputMedArmory defaultValue={item.special} />
                  </div>
                  <div>
                    <label htmlFor="inputResist">Preço</label>
                    <input defaultValue={item.price} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </WeaponContainer>
      </ArmoryContainer>
    </Container>
  )
}
