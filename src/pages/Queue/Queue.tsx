import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AddItemModal from '../../components/AddItemModal'
import QueueList from '../../components/QueueList'
import QueueToolbar from '../../components/QueueToolbar'
import { AddButton } from '../../components/QueueToolbar/AddButton/styles'
import { FirebaseContext } from '../../states/FirebaseState'
import { IOcurrency } from './types'
import Skeleton from 'react-loading-skeleton'
import OcurrencyCard from '../../components/OcurrencyCard'
import SeeItemModal from '../../components/SeeItemModal'
import OnlySolved from '../../components/Filters/OnlySolved'
import useProviders from '../../hooks/useProviders'
import { SmallSelect } from './styles'
import { FilterContainer, QueueItemsContainer } from '../../components/QueueItemContainer/styles'

const QueuePage = () => {

  const { database } = useContext(FirebaseContext)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<IOcurrency[]>([])
  const [snapshots, setSnapshots] = useState<any>([])
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IOcurrency | undefined>(undefined)
  const [onlySolved, setOnlySolved] = useState(false)
  const [selectedEnvironment, setSelectedEnvironment] = useState<string | null>(null)
  const providers = useProviders()

  const getDocQuery = () => {
    if (!database) {
      return null
    }
    let query = database.collection('ocurrencies').orderBy('when', 'desc')
    if (onlySolved) {
      query = query.where('solved', '==', true)
    }

    if (selectedEnvironment) {
      query = query.where('environment', '==', selectedEnvironment)
    }
    
    const startAt = snapshots.length ? snapshots[snapshots.length - 1] : null
    console.log(startAt)
    if (startAt) {
      query = query.startAfter(startAt)
    }

    return query.limit(5)
  }

  const fetchItems = useCallback(async () => {
    if (!database) {
      return
    }
    try {
      setLoading(true)
      const query = getDocQuery()
      if (!query) {
        return
      }
      const items = await query.get()
      const formattedItems = []
      for (let item of items.docs) {
        const data = item.data()
        data.key = item.id
        formattedItems.push(data as IOcurrency)
      }

      setItems(formattedItems)
      setSnapshots([...snapshots, ...items.docs])
    } catch (e) {
      console.error(e)
      toast.error('Houve um erro ao carregar as ocorrências')
    } finally {
      setLoading(false)
    }
  }, [onlySolved, selectedEnvironment])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleAddToQueue = () => {
    setAddModalOpen(true)
    console.log('should open')
  }

  const handleModalClose = () => {
    setAddModalOpen(false)
    fetchItems()
  }

  const handleItemOpen = (item: IOcurrency) => {
    setDetailsModalOpen(true)
    setSelectedItem(item)
  }

  const renderItems = () => {
    if (!items.length || loading) {
      return null
    }

    return items.map((item) => {
      const when = new Date(item.when.seconds * 1000)
      return <OcurrencyCard onItemOpen={handleItemOpen} key={when.getTime()} item={item} />
    })
  }

  return (
    <>
      <QueueToolbar>
        <div style={{ display: 'flex' }}>
          <AddButton onClick={handleAddToQueue}>
            <FontAwesomeIcon icon={faPlus} />
          </AddButton>
        </div>
      </QueueToolbar>
      <AddItemModal onClose={handleModalClose} open={addModalOpen}></AddItemModal>
      <SeeItemModal onClose={() => setDetailsModalOpen(false)} isOpen={detailsModalOpen} item={selectedItem}></SeeItemModal>
      {
        (
          <QueueItemsContainer>
            <FilterContainer>
              <div>
                <h3 style={{ margin: 0 }}>Filtros:</h3>
                <hr></hr>
              </div>
              <OnlySolved onChange={checked => setOnlySolved(checked)} checked={onlySolved}></OnlySolved>
              <p>
                Ambiente:
                <SmallSelect onChange={(e) => setSelectedEnvironment(e.target.value)}>
                  <option value="" selected>Selecione</option>
                  {providers.map((provider) => {
                    return <option key={provider.value} value={provider.value}>{provider.name}</option>
                  })}
                </SmallSelect>
              </p>
            </FilterContainer>
            <QueueList>
              {
                loading && <Skeleton count={5} height={100} />
              }
              {
                !loading && items.length == 0 && <h2 style={{ margin: 0 }}>Nenhuma ocorrência encontrada</h2>
              }
              {renderItems()}
              <p style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => fetchItems()}>Carregar mais itens</p>
            </QueueList>
          </QueueItemsContainer>
        )
      }
    </>
  )
}

export default QueuePage